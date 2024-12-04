// Utility to read input file and return its content as a string
async function readInput(filePath: string): Promise<string> {
  try {
    const data = await Deno.readTextFile(filePath)
    return data
  } catch (error) {
    console.error("Error reading file:", error)
    Deno.exit(1)
  }
}

// Define the Input type as
type Input = number[][]

const format = (data: string) =>
  data.split("\n").map((x) =>
    x
      .split(/\s+/) // Split on whitespace
      .map((x) => Number(x))
  )
const part1 = (input: Input) =>
  input.reduce((acc, report) => {
    const dir = Math.sign(report[1] - report[0])
    const isSafe = (arr: number[]): number => {
      if (arr.length == 1) return 1
      const currDir = Math.sign(arr[1] - arr[0])
      const levelDiff = Math.abs(arr[0] - arr[1])
      const levelIsValid = levelDiff >= 1 && levelDiff <= 3

      return levelIsValid && currDir === dir ? isSafe(arr.slice(1)) : 0
    }
    return acc + isSafe(report)
  }, 0)

const part2 = (input: Input) => {
  const isSafe = (arr: number[]): number => {
    if (arr.length < 2) return 1
    const dir = Math.sign(arr[1] - arr[0])

    for (let i = 1; i < arr.length; i++) {
      const currDir = Math.sign(arr[i] - arr[i - 1])
      const levelDiff = Math.abs(arr[i] - arr[i - 1])

      if (currDir !== dir || levelDiff < 1 || levelDiff > 3) {
        return 0
      }
    }
    return 1
  }

  return input.reduce((acc, report) => {
    if (isSafe(report)) return acc + 1

    for (let i = 0; i < report.length; i++) {
      const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)]
      if (isSafe(modifiedReport)) {
        return acc + 1
      }
    }
    return acc
  }, 0)
}

// Main function to handle async execution
async function main() {
  const rawInput = await readInput("input.txt")
  const data = format(rawInput)

  console.log("Part 1:", part1(data))
  console.log("Part 2:", part2(data))
}

main()
