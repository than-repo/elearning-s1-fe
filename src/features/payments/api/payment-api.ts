import { apiRequest } from "@/lib/api/client";

import type {
  CreateVnpayPaymentUrlInput,
  CreateVnpayPaymentUrlResult,
  CreateSimulationPaymentInput,
  SimulationPaymentResult,
  VnpayReturnResult,
} from "../types/payment";

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
    },
  );
}

export function verifyVnpayReturn(queryString: string) {
  const suffix = queryString ? `?${queryString}` : "";

  return apiRequest<VnpayReturnResult>(
    `/payments/vnpay/verify-return${suffix}`,
    {
      method: "GET",
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
    },
  );
}

export function failSimulationPayment(paymentId: string, accessToken: string) {
  return apiRequest<SimulationPaymentResult>(
    `/payments/simulation/${encodeURIComponent(paymentId)}/fail`,
    {
      accessToken,
      method: "POST",
    },
  );
}
