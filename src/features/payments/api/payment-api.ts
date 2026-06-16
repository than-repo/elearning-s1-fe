import { apiRequest } from "@/lib/api/client";

import type {
  CreateVnpayPaymentUrlInput,
  CreateVnpayPaymentUrlResult,
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

  return apiRequest<VnpayReturnResult>(`/payments/vnpay/return${suffix}`, {
    method: "GET",
  });
}
