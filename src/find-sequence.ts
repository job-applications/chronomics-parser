import * as parse from 'csv-parse'

export const findSequence = (parser: parse.Parser) => async (chromosome: string, position: string) => {
  for await (const record of parser) {
    if (record.CHROM === chromosome && record.POS === position) {
      return record.REF
    }
  }

  return null
}
