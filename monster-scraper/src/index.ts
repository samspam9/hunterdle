import puppeteer from "puppeteer"
import { writeFileSync } from "fs"

import { Monster, MonsterElement } from "./types/monster"
import { allGames } from "./constants"

const baseUrl = "https://monsterhunter.fandom.com"

async function main() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto(`${baseUrl}/wiki/Monster_List`)

  const monsters = await page.evaluate(() => {
    const tables = document.querySelectorAll("table tbody tr:not(.sortbottom)")
    return Array.from(tables, (table) => {
      const link = table.querySelector("td:nth-child(2) a")
      if (!link) {
        return null
      }
      return {
        link: link.getAttribute("href"),
        name: link.innerHTML,
      }
    })
  })

  const record: Record<string, Monster> = {}

  for (const monster of monsters) {
    console.log(monster)

    if (monster) {
      await page.goto(`${baseUrl}${monster.link}`)

      const m = await page.evaluate((allGames: string[]) => {
        const image = document
          .querySelector("#mw-content-text > div > aside > figure > a > img")
          ?.getAttribute("src")

        const monsterType = document.querySelector(
          '#mw-content-text > div > aside > section > div[data-source="Monster Type"] > div > a'
        )?.innerHTML

        const elementsRows = Array.from(
          document.querySelectorAll(
            '#mw-content-text > div > aside > section > div[data-source="Element"] > div > small > a:last-child'
          ),
          (v) => {
            return { title: v.getAttribute("title")!, value: v.innerHTML }
          }
        )

        const elements: MonsterElement[] = []
        for (let i = 0; i < elementsRows.length; i++) {
          const row = elementsRows[i]
          const nextRow = elementsRows[i + 1]
          if (allGames.includes(row.title)) continue
          if (nextRow && allGames.includes(nextRow.title)) {
            elements.push({ element: row.value, gameSpecific: nextRow.title })
          } else {
            elements.push({ element: row.value })
          }
        }

        const ailments = Array.from(
          document.querySelectorAll(
            '#mw-content-text > div > aside > section > div[data-source="Ailments"] > div > small > a[title="Status Effects"]'
          ),
          (v) => v.innerHTML
        )

        const weakestToRows = Array.from(
          document.querySelectorAll(
            '#mw-content-text > div > aside > section > div[data-source="Weakest to"] > div > small > a:last-child'
          ),
          (v) => {
            return { title: v.getAttribute("title")!, value: v.innerHTML }
          }
        )

        const weakestTo: MonsterElement[] = []
        for (let i = 0; i < weakestToRows.length; i++) {
          const row = weakestToRows[i]
          const nextRow = weakestToRows[i + 1]
          if (allGames.includes(row.title)) continue
          if (nextRow && allGames.includes(nextRow.title)) {
            weakestTo.push({ element: row.value, gameSpecific: nextRow.title })
          } else {
            weakestTo.push({ element: row.value })
          }
        }

        const generation = document.querySelector(
          '#mw-content-text > div > aside > section > div[data-source="Generation"] > div > a'
        )?.innerHTML

        const firstAppearance = document.querySelector(
          '#mw-content-text > div > h2:has(> span[id="Game_Appearances"]) + div > div > ul > li> a'
        )?.innerHTML

        return {
          image,
          monsterType,
          elements,
          ailments,
          weakestTo,
          generation,
          firstAppearance,
        }
      }, allGames)

      console.log("m", m)

      record[monster.name] = { name: monster.name, ...m }
    }
  }

  writeFileSync("monsters.json", JSON.stringify(record), "utf8")

  await page.close()
  await browser.close()
}

main()
