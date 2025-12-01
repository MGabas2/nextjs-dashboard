import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';

// ❌ Removed imports (commented so you can compare)
// import { Card } from '@/app/ui/dashboard/cards';
// import { fetchCardData } from '@/app/lib/data';

import CardWrapper from '@/app/ui/dashboard/cards';
import { CardsSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';

import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function Page() {
  const latestInvoices = await fetchLatestInvoices();

  // ❌ Deleted: fetchCardData() because CardWrapper fetches it inside
  /*
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  */

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* ------------------ OLD CARDS (REMOVED) ------------------ */}
      {/*
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      */}

      {/* ------------------ NEW CARD WRAPPER ------------------ */}
      <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
      </Suspense>

      {/* ------------------ CHART + INVOICES ------------------ */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
