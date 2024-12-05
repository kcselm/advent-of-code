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

// Define the Input type as String
type Input = string

const part1 = (input: Input): number => {
  const matches = input.match(/mul\(\d{1,3},\d{1,3}\)/g)
  if (!matches) return 0
  return matches.reduce(
    (a, b) =>
      a +
      (b.match(/\d{1,3},\d{1,3}/)?.map((e) =>
        e
          .split(",")
          .map((e) => parseInt(e))
          .reduce((c, d) => c * d, 1)
      )[0] ?? 0),
    0
  )
}

const part2 = (input: Input): number => {
  const segments = ("do()" + input).split(/(do\(\)|don't\(\))/)
  let flag = false
  let count = 0

  for (const segment of segments) {
    if (segment === "do()") {
      flag = true
    } else if (segment === "don't()") {
      flag = false
    } else if (flag) {
      const matches = segment.match(/mul\(\d{1,3},\d{1,3}\)/g) ?? []

      count += matches
        .map((e) => {
          const innerMatch = e.match(/\d{1,3},\d{1,3}/)
          if (!innerMatch) return 0

          return innerMatch[0]
            .split(",")
            .map((num) => parseInt(num))
            .reduce((c, d) => c * d, 1)
        })
        .reduce((a, b) => a + b, 0)
    }
  }

  return count
}

// Main function to handle async execution
async function main() {
  const rawInput = await readInput("input.txt")
  //   const data = format(rawInput)

  console.log("Part 1:", part1(rawInput))
  console.log("Part 2:", part2(rawInput))
}

main()
