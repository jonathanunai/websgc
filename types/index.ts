export {}

declare global {
  interface Edition {
    nombre: string
    actividad: string
    asistentes: string
    descripcion: string
    edicion: string
    fecha: string
    imagen: string
    organizador: string
    puntos_actividad: number
    puntos_ambiente_nocturno: number
    puntos_calidad: number
    puntos_local: number
    puntos_organizacion: number
    puntos_organizacion_perc: number
    puntos_precio: number
    puntos_servicio: number
    puntos_vino: number
    puntuacion_restaurante: number
    puntuacion_total: number
    restaurante: string
    vinos: string
    web_actividad: string
    web_restaurante: string
  }
}
