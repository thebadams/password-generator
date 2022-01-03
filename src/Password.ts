
export interface PasswordConfig {
	length: number;
	includesUpperCase: boolean;
	includesLowerCase: boolean;
	includesNumeric: boolean;
	includesSpecial: boolean;
}

export interface CharacterTypes {
	upperCase: string[];
	lowerCase: string[];
	numeric: number[];
	special: string[];
}

 export default class Password {
	password: string;
	constructor(password: (string | number)[]) {
		this.password = password.join("") 
	}
	private static CHARACTERTYPES = {
		upperCase: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
		lowerCase: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
			"k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
		numeric: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
		special: ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":",
			";", "<", ">", "=", ">", "?", "@", "[", "]", "^", "_", "`", "|", "~", " "]//insert array of special characters here.

	}
	private static LENGTH = 0
	private static POSSIBLECHARACTERS: (string[] | number[])[]
	private static PASSWORDCHARACTERS: (string | number) []
	private static PASSED: boolean
	private static setPasswordLength(passwordConfig: PasswordConfig): void {
		const { length } = passwordConfig;
			this.LENGTH = length
	}
	private static setPossibleCharacters(passwordConfig: PasswordConfig): void {
		const { includesLowerCase, includesUpperCase, includesNumeric, includesSpecial } = passwordConfig;
		this.POSSIBLECHARACTERS = []
		if(includesLowerCase) {
			this.POSSIBLECHARACTERS.push(this.CHARACTERTYPES.lowerCase);
		}
		if(includesUpperCase) {
			this.POSSIBLECHARACTERS.push(this.CHARACTERTYPES.upperCase);
		}
		if(includesNumeric) {
			this.POSSIBLECHARACTERS.push(this.CHARACTERTYPES.numeric);
		}
		if(includesSpecial) {
			this.POSSIBLECHARACTERS.push(this.CHARACTERTYPES.special);
		}
	}
	private static setPasswordMetaData(passwordConfig: PasswordConfig) {
		this.setPasswordLength(passwordConfig);
		this.setPossibleCharacters(passwordConfig);
	}
	private static setPasswordCharacters(passwordConfig: PasswordConfig) {
		Password.PASSWORDCHARACTERS = []
		for(let i = 1; i <= this.LENGTH; i++) {
			const character = Password.getRandomCharacter();
			this.PASSWORDCHARACTERS.push(character);
		}
		this.testPasswordCharacters(passwordConfig);
		if(this.PASSED){
			return
		} else {
			this.setPasswordCharacters(passwordConfig);
		}
	}

	private static setPasswordTestResult(result: boolean) {
		this.PASSED = result;
	}
	private static testPasswordCharacters(passwordConfig: PasswordConfig) {
		const passwordValue = Password.PASSWORDCHARACTERS.join('')
		Password.PASSED = true;
		const regexUpper = /[A-Z]/
		const regexLower = /[a-z]/
		const regexNumber = /[0-9]/
		const regexSpecial = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/
		
		if (passwordConfig.includesUpperCase) {
			if (!(regexUpper.test(passwordValue))) {
				this.setPasswordTestResult(false)
			};
		};
		if (passwordConfig.includesLowerCase) {
			if (!(regexLower.test(passwordValue))) {
				this.setPasswordTestResult(false)
			};
		};
		if (passwordConfig.includesNumeric) {
			if (!(regexNumber.test(passwordValue))) {
				this.setPasswordTestResult(false)
			};
		};
		if (passwordConfig.includesSpecial) {
			if (!(regexSpecial.test(passwordValue))) {
				this.setPasswordTestResult(false)
			};
		};
	}
	private static getRandomCharacter(): string | number {
		const charType = Math.floor(Math.random()*this.POSSIBLECHARACTERS.length);
		const charNum = Math.floor(Math.random()*this.POSSIBLECHARACTERS[charType].length);
		const character = this.POSSIBLECHARACTERS[charType][charNum];
		return character
	}
	private static resetPasswordLength() {
		Password.LENGTH = 0;
	}
	private static resetPossibleCharacters() {
		Password.POSSIBLECHARACTERS = []
	}
	private static resetPasswordCharacters() {
		Password.PASSWORDCHARACTERS = []
	}
	 public static Config(passwordConfig: PasswordConfig) {
		this.setPasswordMetaData(passwordConfig);
		this.setPasswordCharacters(passwordConfig);
		return new Password(Password.PASSWORDCHARACTERS);
	 }
}