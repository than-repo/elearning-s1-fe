import { apiRequest } from "@/lib/api/client";

import type {
  CreateVnpayPaymentUrlInput,
  CreateVnpayPaymentUrlResult,
  CreateSimulationPaymentInput,
  SimulationPaymentResult,
  VnpayReturnResult,
  GetPaymentsResponse,
} from "../types/payment";

const paymentDevHeaders: HeadersInit = { "ngrok-skip-browser-warning": "true" };

export function createVnpayPaymentUrl(
  input: CreateVnpayPaymentUrlInput,
  accessToken: string,
) {
  return apiRequest<CreateVnpayPaymentUrlResult>(
    "/payments/vnpay/create-payment-url",
    {
      accessToken,
      body: input,
      method: "POST",
      headers: paymentDevHeaders,
    },
  );
}

export function verifyVnpayReturn(queryString: string) {
  const suffix = queryString ? `?${queryString}` : "";

  return apiRequest<VnpayReturnResult>(
    `/payments/vnpay/verify-return${suffix}`,
    {
      method: "GET",
      headers: paymentDevHeaders,
    },
  );
}

export function createSimulationPayment(
  input: CreateSimulationPaymentInput,
  accessToken: string,
) {
  return apiRequest<SimulationPaymentResult>(
    "/payments/simulation/create-payment",
    {
      accessToken,
      body: input,
      method: "POST",
      headers: paymentDevHeaders,
    },
  );
}

export function confirmSimulationPayment(
  paymentId: string,
  accessToken: string,
) {
  return apiRequest<SimulationPaymentResult>(
    `/payments/simulation/${encodeURIComponent(paymentId)}/confirm`,
    {
      accessToken,
      method: "POST",
      headers: paymentDevHeaders,
    },
  );
}

export function failSimulationPayment(paymentId: string, accessToken: string) {
  return apiRequest<SimulationPaymentResult>(
    `/payments/simulation/${encodeURIComponent(paymentId)}/fail`,
    {
      accessToken,
      method: "POST",
      headers: paymentDevHeaders,
    },
  );
}

export function getMyPayments(accessToken: string) {
  return apiRequest<GetPaymentsResponse>(`/payments/me`, {
    method: "GET",
    accessToken,
  });
}
