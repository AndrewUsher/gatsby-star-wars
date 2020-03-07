require('isomorphic-fetch')
const path = require('path')

const fetchFilms = async (actions) => fetch('https://swapi.co/api/films').then(async response => {
  const FilmsTemplate = path.resolve('./src/templates/Films.js')
  const { results: films } = await response.json()
  actions.createPage({
    path: '/films',
    component: FilmsTemplate,
    context: {
      films
    }
  })
})

const fetchPlanets = async (actions) => fetch('https://swapi.co/api/planets?page=1').then(async response => {
  console.log('inside of fetch planets')
  const allPlanets = []
  const data = await response.json()
  let { next } = data
  const { count, results: planets } = data

  let pageNumber = 1
  allPlanets.push(planets)
  while (next) {
    console.log({ allPlanets, pageNumber, count })
    pageNumber++
    const response = await fetch(`https://swapi.co/api/planets?page=${pageNumber}`)
    const data = await response.json()
    next = data.next
    allPlanets.push(data.planets)
  }

  const PlanetsTemplate = path.resolve('./src/templates/Planets.js')
  actions.createPage({
    path: '/planets',
    component: PlanetsTemplate,
    context: {
      planets: allPlanets
    }
  })
})

exports.createPages = async ({ actions }) => {
  return Promise.all([fetchFilms(actions), fetchPlanets(actions)])
}
