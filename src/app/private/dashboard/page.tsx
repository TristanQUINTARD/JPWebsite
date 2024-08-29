import { Card, CardContent, CardHeader, CardTitle } from '../../Components/ui/Card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../../Components/ui/Table';

import React from 'react';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Dashboard = async () => {

  const session = await getSession();
  const user = session?.user;
  if (!user) redirect('/');

  return (
    <div className='flex min-h-screen'>
      <div className="flex-1 bg-gray-100 dark:bg-gray-950">
        <div className="p-6 grid gap-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>User</div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci esse amet hic, a ipsum consectetur necessitatibus laboriosam repellendus veritatis aperiam aut similique sint minima nisi ullam error rerum autem atque.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>User</div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci esse amet hic, a ipsum consectetur necessitatibus laboriosam repellendus veritatis aperiam aut similique sint minima nisi ullam error rerum autem atque.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>User</div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci esse amet hic, a ipsum consectetur necessitatibus laboriosam repellendus veritatis aperiam aut similique sint minima nisi ullam error rerum autem atque.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>User</div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci esse amet hic, a ipsum consectetur necessitatibus laboriosam repellendus veritatis aperiam aut similique sint minima nisi ullam error rerum autem atque.</p>
              </CardContent>
            </Card>
          </div>


          <div className='grid gap-6 text-white'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Les connexions récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=' text-white'>Nom</TableHead>
                      <TableHead className=' text-white'>Email</TableHead>
                      <TableHead className=' text-white'>Date</TableHead>

                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>keanu.reeves@gmail.com</TableCell>
                      <TableCell>2022-01-01</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>keanu.reeves@gmail.com</TableCell>
                      <TableCell>2022-01-01</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
