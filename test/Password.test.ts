import Password, { PasswordConfig, CharacterTypes } from '../src/Password';

describe('Password Class', () => {
	test('Password Class Should Exist', () => {
		expect(Password).toBeDefined();
	});
test('Password Should Have a Property, Length', () => {
	expect(Password).toHaveProperty('LENGTH');
})
test('Password Should Have Property, CHARACTERTYPES', () => {
	expect(Password).toHaveProperty('CHARACTERTYPES');
})

describe('Password Configuration', () => {
	test('Running Password.Config() should run the necessary functions ', () => {
		const config: PasswordConfig = {
			length: 16,
			includesLowerCase: true,
			includesUpperCase: true,
			includesNumeric: true,
			includesSpecial: true
		}
		const characterTypes = {
			upperCase: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
			lowerCase: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
				"k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
			numeric: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
			special: ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":",
				";", "<", ">", "=", ">", "?", "@", "[", "]", "^", "_", "`", "|", "~", " "]//insert array of special characters here.

		}
		const newPassword = Password.Config(config);
		console.log(newPassword)
		expect(Password).toHaveProperty('POSSIBLECHARACTERS', [characterTypes.lowerCase, characterTypes.upperCase, characterTypes.numeric, characterTypes.special]);
		expect(Password).toHaveProperty('PASSWORDCHARACTERS')
		expect(Password).toHaveProperty('LENGTH', 16)
		expect(newPassword).toBeInstanceOf(Password);
		expect(newPassword).toHaveProperty('password');
		expect(newPassword.password).toHaveLength(16)
		
	})
})

})