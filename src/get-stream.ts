import * as parse from 'csv-parse'
import * as fs from 'fs'

export const getStream = (fileName: string): parse.Parser => fs
.createReadStream(fileName)
.pipe(parse({
  delimiter: '\t',
  trim: true,
  comment: '#',
  skip_empty_lines: true,
  columns: [
    'CHROM',
    'POS',
    'ID',
    'REF',
    'ALT',
    'QUAL',
    'FILTER',
    'INFO',
    'FORMAT',
    'CL100070381_L1_HUMfbjRAAAC',
  ]
}))
