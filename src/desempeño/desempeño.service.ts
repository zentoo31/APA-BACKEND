import { Injectable } from '@nestjs/common';
import { Desempeño } from './desempeño.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
@Injectable()
export class DesempeñoService {

    constructor(@InjectRepository(Desempeño)private desempeñoRepository: Repository<Desempeño>){}

 
    async getNotaPromedioGeneral(){
        const result = await this.desempeñoRepository
            .createQueryBuilder('desempeño')
            .select('AVG(desempeño.nota)', 'promedio')
            .getRawOne();

        return { promedio: parseFloat(result.promedio) };
    }
    
    async getPromedioNotasPorCurso() {
        const resultados = await this.desempeñoRepository
            .createQueryBuilder('desempeño')
            .innerJoin('desempeño.curso', 'curso')
            .select(['curso.NombreCurso', 'AVG(desempeño.nota) AS promedio'])
            .groupBy('curso.NombreCurso')
            .having('AVG(desempeño.nota) <= :promedio', { promedio: 16 })
            .getRawMany();

        return resultados;
    }

    async getNotasMenores14() {
        const result = await this.desempeñoRepository
            .createQueryBuilder()
            .select('SUM(CASE WHEN nota < 14 THEN 1 ELSE 0 END)', 'cantidad')
            .addSelect('(SUM(CASE WHEN nota < 14 THEN 1 ELSE 0 END) * 100.0) / COUNT(*)', 'porcentaje')
            .getRawOne();

        
        result.porcentaje = parseFloat(result.porcentaje).toFixed(1);

        return result;
    }

    async getNotasMayores18() {
        const result = await this.desempeñoRepository
            .createQueryBuilder()
            .select('SUM(CASE WHEN nota > 18 THEN 1 ELSE 0 END)', 'cantidad')
            .addSelect('(SUM(CASE WHEN nota > 18 THEN 1 ELSE 0 END) * 100.0) / COUNT(*)', 'porcentaje')
            .getRawOne();

        result.porcentaje = parseFloat(result.porcentaje).toFixed(1);

        return result;
    }

    async getCantidadEstudiantesPorTurno() {
    const result = await this.desempeñoRepository
        .createQueryBuilder('H')
        .innerJoin('H.estudiante', 'E')
        .innerJoin('H.tiempo', 'T')
        .innerJoin('H.curso', 'C')
        .select(`
        CASE 
            WHEN T.Turno = 1 THEN 'Mañana'
            WHEN T.Turno = 2 THEN 'Tarde'
            WHEN T.Turno = 3 THEN 'Noche'
            ELSE '0 Desconocido' 
        END
        `, 'Turno')
        .addSelect('COUNT(DISTINCT E.CodigoE)', 'cantidadEstudiantes')
        .groupBy('T.Turno')
        .getRawMany();

    return result;
    }   

    async getNotasCursos(){
        const resultados = await this.desempeñoRepository
        .createQueryBuilder('desempeño')
        .innerJoin('desempeño.curso', 'curso')
        .select('curso.NombreCurso', 'NombreCurso')
        .addSelect('COUNT(desempeño.nota)', 'TotalNota')
        .addSelect('COUNT(CASE WHEN desempeño.nota < 14 THEN 1 END)', 'NotasMenor14')
        .addSelect('ROUND(CAST(COUNT(CASE WHEN desempeño.nota < 14 THEN 1 END) * 100.0 / COUNT(desempeño.nota) AS DECIMAL(10, 2)), 2)', 'PorcentajeNotasMenor14')
        .addSelect('COUNT(CASE WHEN desempeño.nota > 16 THEN 1 END)', 'NotasMayor16')
        .addSelect('ROUND(CAST(COUNT(CASE WHEN desempeño.nota > 16 THEN 1 END) * 100.0 / COUNT(desempeño.nota) AS DECIMAL(10, 2)), 2)', 'PorcentajeNotasMayor16')
        .groupBy('curso.NombreCurso')
        .getRawMany();
    
       return resultados;
    }

    async  getResumen(añoI: number, añoF: number) {
        const results = await this.desempeñoRepository
      .createQueryBuilder('d')
      .innerJoin('d.tiempo', 't')
      .innerJoin('d.curso', 'c')
      .select([
        'c.NombreCurso',
        `CONCAT(t.Año, '-', 
           CASE 
               WHEN t.Semestre = 'Primer Semestre' THEN 'I' 
               WHEN t.Semestre = 'Segundo Semestre' THEN 'II' 
           END) AS Periodo`,
        'AVG(d.nota) as promedio',
      ])
      .where('t.Año >= :startYear AND t.Año < :endYear', { startYear: añoI, endYear: añoF })
      .groupBy('c.NombreCurso')
      .addGroupBy('t.Año')
      .addGroupBy('t.Semestre')
      .orderBy('c.NombreCurso, Periodo')
      .getRawMany();
  
    return results;
    }

    async PromedioPorGeneroCurso(idCurso: string) {
        const resultados = await this.desempeñoRepository
            .createQueryBuilder('desempeño')
            .innerJoin('desempeño.estudiante', 'estudiante')
            .select('estudiante.descripcion', 'Genero')
            .addSelect('AVG(desempeño.nota)', 'promedio')
            .addSelect('ROUND((AVG(desempeño.nota) / 20.0) * 100.0, 2)', 'porcentaje')
            .where('desempeño.idCurso = :idCurso', { idCurso })
            .groupBy('estudiante.descripcion')
            .getRawMany();
        return resultados;
    }

    async PromedioPorTurnoCurso(idCurso: string) {
        const resultados = await this.desempeñoRepository
            .createQueryBuilder('desempeño')
            .select(`
                CASE desempeño.Turno
                    WHEN 'M' THEN 'Mañana'
                    WHEN 'T' THEN 'Tarde'
                    WHEN 'N' THEN 'Noche'
                    ELSE 'Desconocido'
                END`, 'Turno')
            .addSelect('AVG(desempeño.nota)', 'Promedio')
            .where('desempeño.idCurso = :idCurso', { idCurso })
            .groupBy('desempeño.Turno')
            .getRawMany();

        return resultados;
    }

    async NotasProfesoresCurso(idCurso: string) {
        const resultados = await this.desempeñoRepository
            .createQueryBuilder('desempeño')
            .innerJoin('desempeño.profesor', 'profesor')
            .select([
                "CONCAT(profesor.apellidosD, ' ', profesor.nombresD) AS NombreCompleto",
                "COUNT(desempeño.nota) AS Total",
                "SUM(CASE WHEN desempeño.nota < 17 THEN 1 ELSE 0 END) AS NotasM",
                "ROUND((SUM(CASE WHEN desempeño.nota < 17 THEN 1 ELSE 0 END) * 100.0) / COUNT(desempeño.nota), 2) AS Porcentaje"
            ])
            .where('desempeño.idCurso = :idCurso', { idCurso })
            .groupBy('profesor.apellidosD')
            .addGroupBy('profesor.nombresD')
            .orderBy('Porcentaje', 'DESC')
            .limit(6)
            .getRawMany();

        return resultados;
    }

    async getNotasPorUnidad(idCurso: string) {
        const resultados = await this.desempeñoRepository
            .createQueryBuilder('desempeño')
            .select('desempeño.idUnidad', 'idUnidad')
            .addSelect('COUNT(desempeño.nota)', 'TotalNotas')
            .addSelect('SUM(CASE WHEN desempeño.nota < 17 THEN 1 ELSE 0 END)', 'NotasM')
            .addSelect('ROUND((SUM(CASE WHEN desempeño.nota < 17 THEN 1 ELSE 0 END) * 100.0) / COUNT(desempeño.nota), 2)', 'Porcentaje')
            .where('desempeño.idCurso = :idCurso', { idCurso })
            .groupBy('desempeño.idUnidad')
            .getRawMany();

        return resultados;
    }

    async getDesempeñoPorTipo(idCurso : string) {
        const resultados = await this.desempeñoRepository
          .createQueryBuilder('d')
          .select('d.idTipo', 'idTipo')
          .addSelect('COUNT(d.nota)', 'cantidad')
          .addSelect('SUM(CASE WHEN d.nota < 17 THEN 1 ELSE 0 END)', 'NotasSatis')
          .addSelect(
            'ROUND((SUM(CASE WHEN d.nota < 17 THEN 1 ELSE 0 END) * 100.0) / COUNT(d.nota), 2)',
            'PorcentajeS',
          )
          .addSelect('SUM(CASE WHEN d.nota > 17 THEN 1 ELSE 0 END)', 'NotasInSatis')
          .addSelect(
            'ROUND((SUM(CASE WHEN d.nota > 17 THEN 1 ELSE 0 END) * 100.0) / COUNT(d.nota), 2)',
            'PorcentajeI',
          )
          .where('d.idCurso = :idCurso', { idCurso})
          .groupBy('d.idTipo')
          .getRawMany();
    
        return resultados;
      }

    async getPromedioCursoE(idCurso: string) {
        const result = await this.desempeñoRepository
            .createQueryBuilder('d')
            .select('AVG(d.nota)', 'promedio')
            .where('d.idCurso = :idCurso', { idCurso })
            .getRawOne();

        return { promedio: parseFloat(result.promedio) };
    }

    async getCantidadEstudiantes(idCurso: string) {
        const result = await this.desempeñoRepository
            .createQueryBuilder('d')
            .select('COUNT(DISTINCT d.codigoE)', 'cantidadM')
            .where('d.idCurso = :idCurso', { idCurso })
            .getRawOne();

        return { cantidadM: parseInt(result.cantidadM, 10) };
    }

    async getCantidadProfesores(idCurso: string) {
        const result = await this.desempeñoRepository
            .createQueryBuilder('d')
            .select('COUNT(DISTINCT d.codigoD)', 'cantidadP')
            .where('d.idCurso = :idCurso', { idCurso })
            .getRawOne();

        return { cantidadP: parseInt(result.cantidadP, 10) };
    }

    async getCantidadRegistros(idCurso: string) {
        const result = await this.desempeñoRepository
            .createQueryBuilder('d')
            .select('COUNT(d.idCurso)', 'cantidadN')
            .where('d.idCurso = :idCurso', { idCurso })
            .getRawOne();

        return { cantidadN: parseInt(result.cantidadN, 10) };
    }

    async getDesempeñoPorAño(idCurso : string) {
        const result = await this.desempeñoRepository
            .createQueryBuilder('d')
            .select('YEAR(d.fechaInicio)', 'year')
            .addSelect('COUNT(d.nota)', 'cantidad')
            .addSelect('SUM(CASE WHEN d.nota > 17 THEN 1 ELSE 0 END)', 'Notas')
            .addSelect('ROUND((SUM(CASE WHEN d.nota > 17 THEN 1 ELSE 0 END) * 100.0) / COUNT(d.nota), 2)', 'Porcentaje')
            .where('d.idCurso = :idCurso', { idCurso })
            .andWhere('YEAR(d.fechaInicio) IN (:...years)', { years: [2009, 2010, 2011, 2021, 2025, 2026] })
            .groupBy('YEAR(d.fechaInicio)')
            .getRawMany();

        return result;
    }

    async getCantidadEstudiantesPorCategoria() {
        const query=  ` SELECT 
        C.Categoria,
        COUNT(DISTINCT E.codigoE) AS cantidad_estudiantes,
        ROUND(COUNT(DISTINCT E.codigoE) * 100.0 / (SELECT COUNT(DISTINCT E2.codigoE) 
                                                   FROM H_DESEMPEÑO_DEST D2
                                                   INNER JOIN DIM_ESTUDIANTES_DEST E2 ON E2.codigoE = D2.codigoE), 2) AS porcentaje
        FROM 
            H_DESEMPEÑO_DEST D
            INNER JOIN DIM_ESTUDIANTES_DEST E ON E.codigoE = D.codigoE
            INNER JOIN DIM_CATEGORIA_DEST C ON C.idCategoriaE = D.idCategoriaE
        GROUP BY 
            C.Categoria; `;
            
        const results = await this.desempeñoRepository.query(query);

        return results;
    }

    async getPromedioNotasPorGenero() {
        const query = `
            WITH StudentAverages AS (
                SELECT
                    E.CodigoE,
                    E.descripcion AS Genero,
                    AVG(H.nota) AS Promedio
                FROM
                    DIM_ESTUDIANTES_DEST E
                    INNER JOIN H_DESEMPEÑO_DEST H ON E.CodigoE = H.CodigoE
                GROUP BY
                    E.CodigoE,
                    E.descripcion
            )
            SELECT
                Genero,
                SUM(CASE WHEN Promedio <= 16 THEN 1 ELSE 0 END) AS cantidad_con_promedio_mayor_a_16,
                SUM(CASE WHEN Genero = 'Femenino' THEN 1 ELSE 0 END) + SUM(CASE WHEN Genero = 'Masculino' THEN 1 ELSE 0 END) AS Total
            FROM
                StudentAverages
            GROUP BY
                Genero;
        `;

        const results = await this.desempeñoRepository.query(query);

        return results;
    }

    async getEstudiantesPorCursoYSemestre(idCurso: string, semestre: string) {
        const queryBuilder = this.desempeñoRepository.createQueryBuilder();
        
        const results = await queryBuilder
            .select([
                'd.codigoE AS codigo',
                'e.apellidosE',
                'e.nombresE',
                'e.dniE AS dni',
                'e.descripcion AS genero',
                'e.descripcionD AS distrito',
                'CASE WHEN MONTH(d.fechaInicio) BETWEEN 1 AND 6 THEN CAST(YEAR(d.fechaInicio) AS VARCHAR) + \'-I\' ELSE CAST(YEAR(d.fechaInicio) AS VARCHAR) + \'-II\' END AS Semestre'
            ])
            .from('H_DESEMPEÑO_DEST', 'd')
            .innerJoin('DIM_ESTUDIANTES_DEST', 'e', 'e.CodigoE = d.codigoE')
            .innerJoin('DIM_CURSO_DEST', 'c', 'c.idCurso = d.idCurso')
            .where('c.idCurso = :idCurso', { idCurso })
            .andWhere("CASE WHEN MONTH(d.fechaInicio) BETWEEN 1 AND 6 THEN CAST(YEAR(d.fechaInicio) AS VARCHAR) + '-I' ELSE CAST(YEAR(d.fechaInicio) AS VARCHAR) + '-II' END = :semestre", { semestre })
            .groupBy('d.codigoE, e.apellidosE, e.nombresE, e.dniE, e.descripcion, e.descripcionD, d.fechaInicio')
            .getRawMany();
    
        return results;
    }
    
    async getDetalleNotaEstudiante(idCurso: string, codigoE: number) {
        const queryBuilder = this.desempeñoRepository.createQueryBuilder('d');
    
        const results = await queryBuilder
            .select(['d.idUnidad', 'd.idTipo', 'd.nota'])
            .where('d.codigoE = :codigoE', { codigoE })
            .andWhere('d.idCurso = :idCurso', { idCurso })
            .getRawMany();
    
        return results;
    }  

}
