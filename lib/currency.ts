export function formatCurrency(amount: number, locale: "en" | "fr" = "en"): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-MA" : "en-MA", {
    style: "currency",
    currency: "MAD",
  }).format(amount)
}

export function formatPhone(phone: string): string {
  // Format: +212 11111111 -> +212 11 111 111
  if (!phone.startsWith("+")) {
    phone = "+" + phone
  }
  return phone.replace(/(\+\d{3})(\d{2})(\d{3})(\d{3})/, "$1 $2 $3 $4")
}

export function maskCardNumber(cardNumber: string): string {
  // 1111 2222 3333 4444 -> **** **** **** 4444
  const lastFour = cardNumber.replace(/\s/g, "").slice(-4)
  return `**** **** **** ${lastFour}`
}
