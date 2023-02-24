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
import Overlay from '~~/components/ActionSheet/Overlay.vue'
import { ActionSheet, ActionSheetOverlay } from '~~/.nuxt/components'

// composable
const { t } = useLang()
const screen = useScreen()

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: capitalize(t('pages.setting.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.setting.description'),
    },
  ],
}))

// funcs
const randomToken = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 255; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

// state
const username = ref('viandwi24')
const id = ref(randomToken())
const enableSpamProtection = ref(false)
const enableDirList = ref(false)
const enableAdvancedSetting = ref(false)
const showPoints = ref(false)

// methods
const validate = async () => {
  // fetch username from github api
  try {
    const response = await fetch(
      `https://api.github.com/users/${username.value}`
    )
    if (response.status !== 200)
      throw new Error(
        `error when fetching username : ${response.statusText} (${response.status})`
      )
    const data = (await response.json()) as {
      name: string
      id: string
    }
    alert(`Found Accout Name ${data.name} with id : ${data.id}`)
  } catch (err) {
    alert(err)
  }
}
const { data: ediciones } = await useFetch<[Edition]>(
  'https://lasgc.com/primoapi/ediciones'
)
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
              v-for="edicion in ediciones"
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
            <TabPanel v-for="edicion in ediciones" :key="edicion.nombre">
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
                      class="font-extrabold"
                      @click="showPoints = true"
                    />
                    <FullOverlay v-if="showPoints" @click="showPoints = false">
                      <h3 class="text-xl text-light-900 text-center font-bold">
                        Restaurante {{ edicion.restaurante }}
                      </h3>
                      <div class="flex flex-row flex-wrap">
                        <CircleWrapper
                          :points="percentage(edicion.puntos_calidad)"
                          text="Calidad de la comida"
                        />
                        <CircleWrapper
                          :points="percentage(edicion.puntos_precio)"
                          text="Calidaad / Precio"
                        />
                        <CircleWrapper
                          :points="percentage(edicion.puntos_local)"
                          text="Ambiente del local"
                        />
                        <CircleWrapper
                          :points="percentage(edicion.puntos_servicio)"
                          text="Amabilidad del personal"
                        />
                        <CircleWrapper
                          :points="percentage(edicion.puntos_vino)"
                          text="Los vinos"
                        />
                        <CircleWrapper
                          :points="percentage(edicion.puntuacion_restaurante)"
                          text="Total"
                        />
                      </div>
                      <h3 class="text-xl text-light-900 text-center font-bold">
                        La noche, actividad cultural y organización
                      </h3>
                      <div class="flex flex-row flex-wrap">
                        <CircleWrapper
                          :points="percentage(edicion.puntos_ambiente_nocturno)"
                          :text="`La noche de ${edicion.nombre}`"
                        />
                        <CircleWrapper
                          v-if="edicion.actividad"
                          :points="percentage(edicion.puntos_actividad)"
                          :text="edicion.actividad"
                        />
                        <CircleWrapper
                          :points="percentage(edicion.puntos_organizacion)"
                          :text="`Organización de ${edicion.organizador}`"
                        />
                      </div>
                    </FullOverlay>
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
<style>
.main-points {
}
.main-points > * {
}
</style>
