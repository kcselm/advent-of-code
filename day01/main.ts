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

// Define the Input type as an array of two number arrays
type Input = number[][]

const format = (data: string): Input =>
  data
    .split("\n")
    .filter(Boolean)
    .reduce(
      (acc, line) => {
        const [left, right] = line.split(/\s+/) // Split on whitespace
        acc[0].push(Number(left))
        acc[1].push(Number(right))
        return acc
      },
      [[], []] as Input
    )
    .reduce((acc, arr) => [...acc, arr.sort((a, b) => a - b)], [] as Input)

// Solve part 1
const part1 = ([left, right]: Input): number => {
  let sum = 0
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i])
  }
  return sum
}

// Solve part 2
const part2 = ([left, right]: Input): number => {
  let sum = 0
  for (let i = 0; i < left.length; i++) {
    sum += right.reduce((acc, num) => acc + (num === left[i] ? num : 0), 0)
  }
  return sum
}

// Main function to handle async execution
async function main() {
  const rawInput = await readInput("input.txt")
  const data: Input = format(rawInput)

  console.log("Part 1:", part1(data))
  console.log("Part 2:", part2(data))
}

main()
