import React from 'react'
import { Table } from '../../Components/ui/Table'

const Settings = () => {
  return (
    <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold'>users</h1>
        <Table className='w-full  shadow'>
            <thead>
                <tr className='bg-gray-200 text-left'>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}

export default Settings