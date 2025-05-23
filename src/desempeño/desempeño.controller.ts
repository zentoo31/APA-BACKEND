import { Controller, Get, Query } from '@nestjs/common';
import { DesempeñoService } from './desempeño.service';

@Controller('desempeno')
export class DesempeñoController {
    constructor(
        private desempeñoService: DesempeñoService,
    ){}

    @Get('notaPromedio')
    async getCantidadTotalEstudiantes() {
        return this.desempeñoService.getNotaPromedioGeneral();
    }

    @Get('cursosPromedio')
    async getPromedioNotasPorCurso(){
        return this.desempeñoService.getPromedioNotasPorCurso();
    }

    @Get('notasMenores14')
    async getNotasMenores14(){
        return this.desempeñoService.getNotasMenores14();
    }

    @Get('estudiantesTurno')
    async getCantidadEstudiantesPorTurno(){
        return this.desempeñoService.getCantidadEstudiantesPorTurno();
    }

    @Get('notasMayores18')
    async getNotasMayores18(){
        return this.desempeñoService.getNotasMayores18();
    }

    @Get('cantidadNotasCurso')
    async getNotasCursos(){
        return this.desempeñoService.getNotasCursos();
    }

    @Get('detalleGenero')
    async getDetalleGenero(){
        return this.desempeñoService.getPromedioNotasPorGenero();
    }

    @Get('estudiantesCategoria')
    async getCantidadEstudiantesPorCategoria(){
        return this.desempeñoService.getCantidadEstudiantesPorCategoria();
    }

    @Get('generoCurso')
    async getPromedioNotasPorGenero(@Query('idCurso') idCurso: string) {
        return this.desempeñoService.PromedioPorGeneroCurso(idCurso);
    }

    @Get('turnoCurso')
    async getPromedioNotasPorTurno(@Query('idCurso') idCurso: string) {
        return this.desempeñoService.PromedioPorTurnoCurso(idCurso);
    }

    @Get('unidadCurso')
    async getNotasPorUnidad(@Query('idCurso') idCurso: string) {
        return this.desempeñoService.getNotasPorUnidad(idCurso);
    }

    @Get('profesoresCurso')
    async getProfesoresTop(@Query('idCurso') idCurso: string) {
        return this.desempeñoService.NotasProfesoresCurso(idCurso);
    }

    @Get('tipoNota')
    async getTipoNotaConsolidado(@Query('idCurso') idCurso: string){
        return this.desempeñoService.getDesempeñoPorTipo(idCurso);
    }

    @Get('anual')
    async getAñoEvalaucion (@Query('idCurso') idCurso: string){
        return this.desempeñoService.getDesempeñoPorAño(idCurso);
    }

    @Get('promedioCursoE')
    async getPromedioCurso(@Query('idCurso') idCurso: string){
        return this.desempeñoService.getPromedioCursoE(idCurso);
    }

    @Get('estudiantesCursoE')
    async getCantidadEstudiantes(@Query('idCurso') idCurso: string ){
        return this.desempeñoService.getCantidadEstudiantes(idCurso);
    }
    
    @Get('profesoresCursoE')
    async getCantidadProfesores(@Query('idCurso') idCurso: string ){
        return this.desempeñoService.getCantidadProfesores(idCurso);
    }

    @Get('cantidadNotasRegistradas')
    async getCantidadRegistros(@Query('idCurso') idCurso:string){
        return this.desempeñoService.getCantidadRegistros(idCurso);
    }

    @Get('resumen')
    async getResumen(@Query('añoI') añoI: number, @Query('añoF') añoF: number) {
      return this.desempeñoService.getResumen(añoI, añoF);
    }

    @Get('estudiantesCursosSemestre')
    async datosEstudiante(@Query('idCurso') idCurso: string, @Query('semestre') semestre: string) {
      return this.desempeñoService.getEstudiantesPorCursoYSemestre(idCurso,semestre);
    }

    @Get('detalleNotaEstudiante')
    async detalleEstudiante(@Query('idCurso') idCurso: string, @Query('codigoE') codigoE: number){
        return this.desempeñoService.getDetalleNotaEstudiante(idCurso,codigoE);
    }
    
}
