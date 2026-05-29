import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/teacher/lesson-plan',
  },
  // ===== Teacher pages (shared nav layout) =====
  {
    path: '/teacher',
    component: () => import('../layouts/TeacherLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/teacher/lesson-plan',
      },
      {
        path: 'lesson-plan',
        name: 'LessonPlan',
        component: () => import('../pages/teacher/LessonPlan.vue'),
      },
      {
        path: 'exam',
        name: 'ExamAssessment',
        component: () => import('../pages/teacher/HomeworkGrading.vue'),
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('../pages/teacher/AnalyticsDashboard.vue'),
      },
    ],
  },
  // ===== Student pages (standalone) =====
  {
    path: '/student/learning-path',
    name: 'LearningPath',
    component: () => import('../pages/student/LearningPath.vue'),
  },
  {
    path: '/student/formula-derivation',
    name: 'FormulaDerivation',
    component: () => import('../pages/student/FormulaDerivation.vue'),
  },
  {
    path: '/student/tutoring-assistant',
    name: 'TutoringAssistant',
    component: () => import('../pages/student/TutoringAssistant.vue'),
  },
  // ===== Researcher pages =====
  {
    path: '/researcher/hotspot',
    name: 'ResearchHotspot',
    component: () => import('../pages/researcher/ResearchHotspot.vue'),
  },
  {
    path: '/researcher/writing-assistant',
    name: 'WritingAssistant',
    component: () => import('../pages/researcher/WritingAssistant.vue'),
  },
  {
    path: '/researcher/datalab',
    name: 'DataLab',
    component: () => import('../pages/researcher/DataLab.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
