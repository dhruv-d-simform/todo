/**
 * Validate the User's name input.
 * @param name User's name input for validation.
 * @returns null if no error, otherwise error message in string.
 */
export function validateName(name: string): string | null {
    name = name.trim();
    if (!name) return 'Please provide a your name';
    if (name.length > 15) return 'Name must not exceed 15 characters';
    if (!/^[a-zA-Z][a-zA-Z ]*$/.test(name))
        return 'Name must only contain letters (a-z, A-Z) and spaces between words, but not at the start';
    return null;
}
