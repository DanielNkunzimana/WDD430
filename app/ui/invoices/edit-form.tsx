'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };

  const updateInvoiceWithId = (prevState: State, formData: FormData) =>
    updateInvoice(invoice.id, prevState, formData);

  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>

          <div className="relative">
            <select
              id="customer"
              name="customerId"
              defaultValue={invoice.customer_id}
              aria-describedby="customer-error"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
            >
              <option value="" disabled>Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>

            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId?.map((error: string) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>

          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              defaultValue={invoice.amount}
              aria-describedby="amount-error"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10"
            />

            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] text-gray-500" />
          </div>

          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount?.map((error: string) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>

          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">

              <label className="flex items-center cursor-pointer">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === 'pending'}
                  aria-describedby="status-error"
                  className="h-4 w-4"
                />
                <span className="ml-2 flex items-center gap-1.5 text-gray-600 bg-gray-100 px-3 py-1.5 text-xs rounded-full">
                  Pending <ClockIcon className="h-4 w-4" />
                </span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === 'paid'}
                  aria-describedby="status-error"
                  className="h-4 w-4"
                />
                <span className="ml-2 flex items-center gap-1.5 bg-green-500 px-3 py-1.5 text-xs text-white rounded-full">
                  Paid <CheckIcon className="h-4 w-4" />
                </span>
              </label>

            </div>
          </div>

          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status?.map((error: string) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          Cancel
        </Link>

        <Button type="submit">Edit Invoice</Button>
      </div>

      {/* General form error message */}
      {state.message && (
        <p className="mt-4 text-sm text-red-500">{state.message}</p>
      )}
    </form>
  );
}
