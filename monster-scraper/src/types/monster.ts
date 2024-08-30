export interface MonsterElement {
  element: string
  gameSpecific?: string
}

export interface Monster {
  name: string
  image?: string | null
  monsterType?: string | null
  elements: MonsterElement[]
  ailments: string[]
  weakestTo: MonsterElement[]
}
