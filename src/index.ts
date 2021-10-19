import {Command, flags} from '@oclif/command'
import {findSequence} from './find-sequence'
import {getStream} from './get-stream'

class ChronomicsParser extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = [
    {
      name: 'file',
      required: true,
      description: 'Provide a data file',
    },
    {
      name: 'search',
      required: true,
      description: 'Provide the search criteria in the format chromosome:position',
    },
  ]

  async run() {
    const {args} = this.parse(ChronomicsParser)

    const [chromosome, position] = args.search.split(':')
    if (!(chromosome && position)) {
      throw new Error('Provide the search criteria in the format chromosome:position')
    }

    const fileStream = getStream(args.file)

    const reference = await findSequence(fileStream)(chromosome, position)
    if (reference) {
      this.log(reference)
    } else {
      throw new Error(`Data not found in '${args.file}' using '${args.search}'`)
    }
  }
}

export = ChronomicsParser
