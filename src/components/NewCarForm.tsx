/*import { createCar } from '@/utils/actions'
import { Brand, CarModel } from '@prisma/client'
import BrandAndModelFormFields from './BrandAndModelFormFields'

const NewCarForm = ({
  models,
  brands,
}: {
  models: CarModel[]
  brands: Brand[]
}) => {
  return (
    <div>
      <form action={createCar} className="mx-auto max-w-3xl flex flex-col rounded-md bg-orange-200 px-10 py-5 shadow-sm shadow-gray-400">
        <BrandAndModelFormFields models={models} brands={brands} />
        <input type="text" name="description" required={true} />
        <button type="submit">submit</button>
      </form>
    </div>
    <div>
      <form action={createCar} className="mx-auto max-w-3xl flex flex-col rounded-md bg-orange-200 px-10 py-5 shadow-sm shadow-gray-400">
        <BrandAndModelFormFields models={models} brands={brands} />
        <input type="text" name="description" required={true} />
        <button type="submit">submit</button>
      </form>
    </div>
    
  )
}*/
'use client'
import { Brand, CarModel } from '@prisma/client'
import { Fragment, useMemo, useState } from 'react'
import Link from 'next/link'
import { createCar } from '@/utils/actions'

const NewCarForm = ({
  models,
  brands,
}: {
  models: CarModel[]
  brands: Brand[]
}) => {
  const [brandId, setBrandId] = useState('')
  const [modelId, setModelId] = useState('')
  const [brandName, setBrandName] = useState('')
  const [modelName, setModelName] = useState('')


  const filteredModels = useMemo(() => {
    const modelNameObj = models.find((model) => model.brandId === brandId)
    setModelName(modelNameObj?.name)
    return models.filter((model) => model.brandId === brandId)
  }, [brandId, models])
  return (
    <div>
      <form action={createCar} className="mx-auto max-w-3xl flex flex-col rounded-md bg-orange-200 px-10 py-5 shadow-sm shadow-gray-400">
        <label className="font-bold">Brand</label>
        <select
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          name="brandId"
          required={true}
          id=""
          value={brandId}
          onChange={(e) => {

            const brandOb = brands.find(obj => {
              return obj.id == e.target.value
            })
            setBrandName(brandOb?.name)

            
          //prot
            setBrandId(e.target.value)
          }}

        >
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        <label className="font-bold">Model</label>
        <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="modelId" required={true} onChange={(e) => {

          const modelOb = filteredModels.find(obj => {
            return obj.id === e.target.value
          })
          setModelName(modelOb?.name)
          //prot
          setModelId(e.target.value)
          }}>
          {filteredModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
        <input className="mt-5" type="text" name="description" required={true} />
        <button className='mt-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' type="submit">submit</button>
      </form>
    </div>
    

    
  )
}

export default NewCarForm
