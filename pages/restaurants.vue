<script lang="ts" setup>
import { capitalize } from '~/utils/str'

// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: capitalize(t('pages.restaurants.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.restaurants.description'),
    },
  ],
}))

// methods
const { data: ediciones } = await useFetch<Array<Edition>>(
  'https://lasgc.com/primoapi/ediciones'
)
const sortedEditions = ediciones.value
  ?.filter((e) => e.tipo === 'Evento')
  .sort((a: Edition, b: Edition) =>
    a.puntuacion_restaurante > b.puntuacion_restaurante ? -1 : 1
  )
const fotos = ediciones.value
  ?.filter(
    (e) =>
      e.tipo === 'Foto' && e.foto_publico === '1' && e.foto_restaurante === '1'
  )
  .map(({ foto, foto_edicion, foto_publico }) => {
    return { foto, fotoEdicion: foto_edicion, fotoPublico: foto_publico }
  })
</script>
<template>
  <div class="p-4 mx-auto">
    <h1 class="text-3xl md:text-5xl">
      {{ capitalize(t('pages.restaurants.title')) }}
    </h1>
    <table class="rwd-table">
      <tr>
        <th>Pos</th>
        <th>Restaurante</th>
        <th>Ciudad</th>
        <th>Puntuación</th>
      </tr>
      <tr v-for="(edition, index) in sortedEditions" :key="index">
        <td data-th="Posición" class="">{{ index + 1 }}</td>
        <td data-th="Restaurante" class="whitespace-nowrap">
          <span>{{ edition.restaurante }}</span
          ><a
            v-if="edition.web_restaurante"
            :href="edition.web_restaurante"
            target="_blank"
          >
            <IconFaSolid:externalLinkAlt
              class="text-xs2 inline-block ml-2 p-1 mb-1 text-teal-200"
            />
          </a>
        </td>
        <td data-th="Lugar" class="">{{ edition.nombre }}</td>
        <td data-th="Puntuación">
          <VDropdown :distance="6" class="inline-block">
            {{ edition.puntuacion_restaurante }}

            <button class="text-teal-200">
              <IconFaSolid:eye
                class="text-xl inline-block ml-2 p-1 mb-1 text-teal-200"
              />
            </button>
            <template #popper>
              <div class="p-4 max-w-lg">
                <p class="text-xl pb-2">{{ edition.restaurante }}</p>
                <p>
                  Calidad comida:
                  <span class="float-right pl-3">{{
                    edition.puntos_calidad
                  }}</span>
                </p>
                <p>
                  Calidad precio:
                  <span class="float-right pl-3">{{
                    edition.puntos_precio
                  }}</span>
                </p>
                <p>
                  Vinos:
                  <span class="float-right pl-3">{{
                    edition.puntos_vino
                  }}</span>
                </p>
                <p>
                  Ambiente:
                  <span class="float-right pl-3">{{
                    edition.puntos_local
                  }}</span>
                </p>
                <p>
                  Amabilidad:
                  <span class="float-right pl-3">{{
                    edition.puntos_servicio
                  }}</span>
                </p>
                <div
                  v-if="fotos"
                  class="overflow-hidden overflow-x-auto w-full flex max-w-full overscroll-none"
                >
                  <img
                    v-for="foto in fotos.filter(
                      (f) => f.foto_edicion === edition.nid
                    )"
                    :key="foto.foto"
                    :src="`http://lasgc.com/${foto.foto}`"
                    alt=""
                    width="330"
                    class="w-full shadow-lg shadow-dark-800"
                  />
                </div>
              </div>
            </template>
          </VDropdown>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="scss">
.rwd-table {
  margin: 1em 0;
  min-width: 300px; // adjust to your needs

  tr {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  th {
    display: none; // for accessibility, use a visually hidden method here instead! Thanks, reddit!
  }

  td {
    display: block;

    &:first-child {
      padding-top: 0.5em;
    }

    &:last-child {
      padding-bottom: 0.5em;
    }

    &:before {
      content: attr(data-th) ': '; // who knew you could do this? The internet, that's who.
      font-weight: bold;

      // optional stuff to make it look nicer
      width: 6.5em; // magic number :( adjust according to your own content
      display: inline-block;
      // end options

      @media (min-width: 500px) {
        display: none;
      }
    }
  }

  th,
  td {
    text-align: left;

    @media (min-width: 500px) {
      display: table-cell;
      padding: 0.25em 0.5em;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }
  }
}

.rwd-table {
  background: #34495e;
  color: #fff;
  border-radius: 0.4em;
  overflow: hidden;

  tr {
    border-color: lighten(#34495e, 10%);
  }

  th,
  td {
    margin: 0.5em 1em;

    @media (min-width: 500px) {
      padding: 1em !important;
    }
  }

  th,
  td:before {
    color: #dd5;
  }
}
</style>
