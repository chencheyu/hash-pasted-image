import * as crypto from 'crypto';
import { HashAlgorithm, EncodeDigest } from 'settings';

export const hash = (algorithm: string, digest: string, contents: string) => {
	const digenc: crypto.BinaryToTextEncoding = <crypto.BinaryToTextEncoding>(
		digest
	);
	return crypto
		.createHash(algorithm)
		.update(contents)
		.digest(digenc)
		.replaceAll('=', '');
};

export const path = {
	join(...partSegments: string[]): string {
		let parts: string[] = [];

		for (let i = 0, l = partSegments.length; i < l; i++) {
			parts = parts.concat(partSegments[i].split('/'));
		}

		const newParts = [];

		for (let i = 0, l = parts.length; i < l; i++) {
			const part = parts[i];
			if (!part || part === '.') continue;
			else newParts.push(part);
		}

		if (parts[0] === '') newParts.unshift('');

		return newParts.join('/');
	},

	basename(fullpath: string): string {
		const sp = fullpath.split('/');

		return sp[sp.length - 1];
	},

	extension(fullpath: string): string {
		const positions = [...fullpath.matchAll(/\./gi)].map((a) => a.index);

		return fullpath.slice(positions[positions.length - 1] + 1);
	},
};

export const stringToHashAlgorithm = (str: string): HashAlgorithm => {
	switch (str) {
		case 'sha256':
			return HashAlgorithm.SHA256;
		case 'sha384':
			return HashAlgorithm.SHA384;
		case 'sha512':
			return HashAlgorithm.SHA512;
		case 'md5':
			return HashAlgorithm.MD5;
		default:
			return HashAlgorithm.SHA512;
	}
};

export const stringToEncodeDigest = (str: string): EncodeDigest => {
	switch (str) {
		case 'hex':
			return EncodeDigest.HEX;
		case 'base64url':
			return EncodeDigest.BASE64URL;
		default:
			return EncodeDigest.HEX;
	}
};
