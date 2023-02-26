<script lang="ts" setup>
import {
  TabGroup,
  TabList,
  Tab as HeadlessUiTab,
  TabPanels,
  TabPanel,
} from '@headlessui/vue'
import { capitalize } from '~/utils/str'
import { formatDate, percentage } from '~/utils/sgc'

import { Size } from '~/composables/useScreen'

// composable
const { t } = useLang()
const screen = useScreen()

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: capitalize(t('pages.events.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.events.description'),
    },
  ],
}))

// state
const showPoints = ref(false)

// methods
const { data: ediciones } = await useFetch<[Edition]>(
  'https://lasgc.com/primoapi/ediciones'
)
const onlyEdiciones = ediciones.value?.filter((e) => e.tipo === 'Evento')
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle
        :text="$t('pages.editions.title')"
        class="capitalize text-lg"
      />
    </PageHeader>
    <PageBody>
      <PageSection>
        <TabGroup
          as="div"
          class="flex flex-col md:flex-row md:space-x-4"
          :vertical="screen.higherThan(Size.MEDIUM)"
        >
          <TabList
            class="w-full md:w-1/6 flex md:flex-col rounded-lg mb-2 overscroll-x-none overflow-x-scroll md:h-screen md:overflow-x-scroll"
          >
            <HeadlessUiTab
              v-for="edicion in onlyEdiciones"
              :key="edicion.edicion"
              v-slot="{ selected }"
              as="template"
            >
              <button
                :class="[
                  'md:w-full text-left px-3 py-1.5 rounded py-2.5 text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white whitespace-nowrap',
                  selected
                    ? 'font-extrabold'
                    : 'text-slate-800 dark:text-gray-400',
                ]"
              >
                <span class="text-xs opacity-50">{{
                  formatDate(edicion.fecha)
                }}</span
                ><br />
                {{ edicion.nombre }}
              </button>
            </HeadlessUiTab>
          </TabList>
          <TabPanels class="flex-1">
            <TabPanel v-for="edicion in onlyEdiciones" :key="edicion.nombre">
              <Card class="mb-4" :img="edicion.imagen" :title="edicion.nombre">
                <CardContent>
                  <p
                    v-if="edicion.descripcion"
                    class="mb-2 px-6"
                    v-html="edicion.descripcion"
                  ></p>
                  <p v-else class="mb-2 px-6">
                    En {{ formatDate(edicion.fecha) }} visitamos
                    {{ edicion.nombre }} y tuvimos el placer de comer en el
                    restaurante {{ edicion.restaurante }}, disfrutar de una
                    actividad como {{ edicion.actividad }}, todo ello organizado
                    por {{ edicion.organizador }}.
                  </p>
                  <div class="bg-dark-300 p-4 my-2 text-light-900 rounded-xl">
                    <h3 class="text-center text-xl">Los puntos</h3>
                    <div class="flex flex-row flex-wrap">
                      <CircleWrapper
                        :points="percentage(edicion.puntuacion_total)"
                        text="Valoración total"
                      />
                      <CircleWrapper
                        :points="percentage(edicion.puntuacion_restaurante)"
                        text="Restaurante"
                      />
                      <CircleWrapper
                        :points="percentage(edicion.puntos_ambiente_nocturno)"
                        text="Ambiente nocturno"
                      />
                      <CircleWrapper
                        :points="percentage(edicion.puntos_actividad)"
                        text="Actividad cultural"
                      />
                    </div>
                    <Button
                      size="md"
                      text="Ver todos"
                      class="font-extrabold mt-2"
                      @click="showPoints = true"
                    />
                    <transition
                      enter-active-class="transition ease-out duration-300"
                      enter-class="transform opacity-0 scale-95"
                      enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-200"
                      leave-class="transform opacity-100 scale-100"
                      leave-to-class="transform opacity-0 scale-95"
                    >
                      <FullOverlay
                        v-if="showPoints"
                        @click="showPoints = false"
                      >
                        <h3
                          class="text-xl text-light-900 text-center font-bold pt-6 pb-2"
                        >
                          Restaurante {{ edicion.restaurante }}
                        </h3>
                        <div class="flex flex-row flex-wrap">
                          <CircleWrapper
                            :points="percentage(edicion.puntos_calidad)"
                            max-lines="3"
                            text="Calidad de la comida"
                          />
                          <CircleWrapper
                            :points="percentage(edicion.puntos_precio)"
                            max-lines="3"
                            text="Calidaad / Precio"
                          />
                          <CircleWrapper
                            :points="percentage(edicion.puntos_local)"
                            max-lines="3"
                            text="Ambiente del local"
                          />
                          <CircleWrapper
                            :points="percentage(edicion.puntos_servicio)"
                            max-lines="3"
                            text="Amabilidad del personal"
                          />
                          <CircleWrapper
                            :points="percentage(edicion.puntos_vino)"
                            max-lines="3"
                            text="Los vinos"
                          />
                          <CircleWrapper
                            :points="percentage(edicion.puntuacion_restaurante)"
                            max-lines="3"
                            text="Total"
                          />
                        </div>
                        <h3
                          class="text-xl text-light-900 text-center font-bold pt-6 pb-2"
                        >
                          La noche, actividad cultural y organización
                        </h3>
                        <div class="flex flex-row flex-wrap">
                          <CircleWrapper
                            :points="
                              percentage(edicion.puntos_ambiente_nocturno)
                            "
                            max-lines="3"
                            :text="`La noche de ${edicion.nombre}`"
                          />
                          <CircleWrapper
                            v-if="edicion.actividad"
                            :points="percentage(edicion.puntos_actividad)"
                            max-lines="3"
                            :text="edicion.actividad"
                          />
                          <CircleWrapper
                            :points="percentage(edicion.puntos_organizacion)"
                            max-lines="3"
                            :text="`Organización de ${edicion.organizador}`"
                          />
                        </div>
                      </FullOverlay>
                    </transition>
                  </div>
                </CardContent>
              </Card>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
<style></style>
