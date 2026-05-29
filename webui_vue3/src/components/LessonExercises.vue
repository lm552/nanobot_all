<template>
  <div class="section-exercises">
    <h2 v-if="section.title">{{ section.title }}</h2>
    <div v-if="section.content">
      <h3 v-if="basicItems.length">基础练习</h3>
      <ol v-if="basicItems.length">
        <li v-for="(item, i) in basicItems" :key="i" v-html="renderMd(item)"></li>
      </ol>
      <div v-if="section.content.advanced">
        <strong>拓展练习（选做）：</strong><span v-html="renderMd(ensureStr(section.content.advanced))"></span>
      </div>
      <div v-if="section.content.homework">
        <strong>课后作业：</strong><span v-html="renderMd(ensureStr(section.content.homework))"></span>
      </div>
    </div>
    <div v-else-if="typeof section.content === 'string'" class="md-content" v-html="renderMd(section.content)"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps({ section: { type: Object, required: true } })

const basicItems = computed(() => {
  const c = props.section.content
  if (!c) return []
  if (Array.isArray(c.basic)) return c.basic.map(ensureStr)
  if (Array.isArray(c)) return c.map(ensureStr)
  if (typeof c.basic === 'string') return [c.basic]
  return []
})

function ensureStr(v) {
  if (typeof v === 'string') return v
  if (v && typeof v === 'object') return v.text || v.label || JSON.stringify(v)
  return String(v ?? '')
}

function renderMd(text) {
  if (typeof text !== 'string') text = String(text ?? '')
  return marked.parseInline(text)
}
</script>
