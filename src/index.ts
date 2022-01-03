import { Command } from 'commander';
import Password, { PasswordConfig } from './Password';

const program = new Command();

program
	.version('0.0.1')

program
	.command('run')
	.option('-u','--upper')
	.option('-lo','--lower')
	.option('-n','--numeric')
	.option('-s','special')
	.option('-ln', 'length')
	.action(() => {
		const {args} = program;
		const passwordConfig: PasswordConfig = {
			includesLowerCase: false,
			includesUpperCase: false,
			includesSpecial: false,
			includesNumeric: false,
			length: 0
		}
		if(args.includes('-u')) {
			passwordConfig.includesUpperCase = true;
		}
		if(args.includes('-lo')) {
			passwordConfig.includesLowerCase = true;
		}
		if(args.includes('-n')) {
			passwordConfig.includesNumeric = true;
		}
		if(args.includes('-s')) {
			passwordConfig.includesSpecial = true;
		}
		if(args.includes('-ln')) {
			const flag = args.lastIndexOf('-ln')
			const value = flag + 1
			if(isNaN(parseInt(args[value]))) {
				console.warn('Expected -ln flag to be followed by a number value')
			} else {
				passwordConfig.length = parseInt(args[value])
			}
		}
		const password = Password.Config(passwordConfig)
		console.log(password.password)
	})

program.parse(process.argv)