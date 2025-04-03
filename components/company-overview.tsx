import { Building2, Globe, MapPin } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CompanyOverviewProps {
  stockData: any
}

export function CompanyOverview({ stockData }: CompanyOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-1">Description</h3>
          <p className="text-sm text-gray-600">{stockData.Description}</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-start gap-2">
            <Building2 className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">Sector & Industry</p>
              <p className="text-sm text-gray-600">
                {stockData.Sector} • {stockData.Industry}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">Headquarters</p>
              <p className="text-sm text-gray-600">{stockData.Address}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Globe className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">Website</p>
              <a
                href={stockData.OfficialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                {stockData.OfficialSite}
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

