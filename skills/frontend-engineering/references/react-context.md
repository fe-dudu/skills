# React Context

- Do not use React Context as a general-purpose global state store.
- Prefer composition with `children` when an intermediate component only forwards props.
- Use Context for a dependency, configuration, service, or feature state shared by multiple components within one component subtree. Do not move every prop into Context just to reduce prop passing.

Use Context to inject a dependency from the component that assembles the subtree:

```tsx
type PaymentGateway = {
  confirmPayment(input: PaymentInput): Promise<void>;
};

const PaymentGatewayContext = createContext<PaymentGateway | null>(null);

function CheckoutForm(): JSX.Element {
  const paymentGateway = useContext(PaymentGatewayContext);

  if (paymentGateway === null) {
    throw new Error("PaymentGatewayContext is missing");
  }

  return (
    <CheckoutFields
      onSubmit={(input) => paymentGateway.confirmPayment(input)}
    />
  );
}

function App({ paymentGateway }: { paymentGateway: PaymentGateway }): JSX.Element {
  return (
    <PaymentGatewayContext.Provider value={paymentGateway}>
      <CheckoutForm />
    </PaymentGatewayContext.Provider>
  );
}

<App paymentGateway={stripePaymentGateway} />;
// Test: <App paymentGateway={fakePaymentGateway} />;
```
