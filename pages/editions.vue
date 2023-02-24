<script lang="ts" setup>
import { capitalize } from '~/utils/str'

// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: capitalize(t('pages.editions.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.editions.description'),
    },
  ],
}))
const { data: ediciones } = await useFetch<[Edition]>(
  'https://lasgc.com/primoapi/ediciones'
)
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :text="$t('pages.editions.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <PageSectionTitle
          :text="$t('pages.editions.description')"
          class="capitalize"
        />
        <div class="">
          <div class="mb-2"></div>
          <div
            class="flex flex-col items-center justify-items-center space-y-2 md:space-y-0 md:flex-col md:space-x-2"
          >
            <div v-for="edicion in ediciones" :key="edicion.edicion">
              {{ edicion.nombre }}
            </div>
          </div>
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
