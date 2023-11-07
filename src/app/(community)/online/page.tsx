import TableEmptyState from "@/components/table-empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { getVocation } from "@/utils/functions/getVocations";
import { fetchOnline } from "./actions";
import Pagination from "@/components/pagination";


export default async function Online({ searchParams }: { searchParams?: { page?: string; } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const { players, totalPage } = await fetchOnline({ currentPage })

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Who&apos;s online?</CardTitle>
        </CardHeader>

        <CardContent className="p-2 space-y-2">
          <div className="flex flex-col rounded-sm border">
            <div className='flex p-2 items-center justify-between bg-gray-100 text-sm'>
              <div />
              <Pagination totalPages={totalPage} />
            </div>
            {players.length > 0 ? (
              <Table>
                <TableHeader className="pointer-events-none">
                  <TableRow>
                    <TableHead className="w-[80px]">Outfit</TableHead>
                    <TableHead className="w-full">Name</TableHead>
                    <TableHead className="w-[100px]">Vocation</TableHead>
                    <TableHead className="w-[20px]">Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((character) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>A</TableCell>
                          <TableCell>{character.name}</TableCell>
                          <TableCell>{getVocation(character.vocation)}</TableCell>
                          <TableCell>{character.level}</TableCell>
                        </TableRow>
                      </>
                    )
                  })}
                </TableBody>
              </Table>
            ) : <TableEmptyState />}
          </div>
        </CardContent>
      </Card>
    </>
  )
}