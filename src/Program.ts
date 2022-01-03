import inquirer, {Answers, InputQuestion} from "inquirer";
import Password, { PasswordConfig } from "./Password";
class Program {
	private static QUESTIONS: string[] = ['Choose a Password Length (Between 8 and 128 Characters)',
'Should Your Password Have Upper Case Letters? (y/n) ',
'Should Your Password Have Lower Case Letters? (y/n) ',
'Should Your Password Include Numeric Characters? (y/n) ',
'Should Your Password Include Special Characters? (y/n)'];
	private static PROMPTS: Answers[] = [
		{ message: this.QUESTIONS[0], type: 'input', name: 'length'},
		{message: this.QUESTIONS[1], type: 'confirm', name: 'includesUpperCase'},
		{message: this.QUESTIONS[2], type: 'confirm', name: 'includesLowerCase'},
		{message: this.QUESTIONS[3], type: 'confirm', name: 'includesNumeric'},
		{message: this.QUESTIONS[4], type: 'confirm', name: 'includesSpecial'}];
	public static async start() {
			const information = await this.gatherInformation()
			const password = this.generatePassword(information);
			this.logPassword(password);
	}
	private static async gatherInformation() {
		const information = await inquirer.prompt(this.PROMPTS)
		return information
	}

	private static generatePassword(passwordConfig: PasswordConfig) {
		return Password.Config(passwordConfig);
	}

	private static logPassword(password: Password) {
		console.log(password.password)
	}
}

Program.start()