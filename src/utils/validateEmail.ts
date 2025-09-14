function validateEmail(value: string): string | null {
    const trimmed = value.trim();
    if (!trimmed) return "email cannot be empty";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(trimmed)) return "invalid email format";
    return null;
}

export default validateEmail;