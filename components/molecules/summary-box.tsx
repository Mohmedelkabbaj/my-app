interface SummaryBoxProps {
  total: number
  itemDescription?: string
}

export const SummaryBox = ({ total, itemDescription = "Order Total" }: SummaryBoxProps) => (
  <div className="border border-border rounded-lg p-6 bg-card">
    <h3 className="text-sm font-medium text-muted-foreground mb-4">ORDER SUMMARY</h3>
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{itemDescription}</span>
        <span className="font-medium text-foreground">{total.toFixed(2)} MAD</span>
      </div>
      <div className="border-t border-border pt-3 flex justify-between">
        <span className="font-semibold text-foreground">Total</span>
        <span className="font-bold text-primary text-lg">{total.toFixed(2)} MAD</span>
      </div>
    </div>
  </div>
)
