'use client'
import { Brand, CarModel } from '@prisma/client'
import { Fragment, useMemo, useState } from 'react'
import Link from 'next/link'

const BrandAndModelFormFields = ({
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


  const param = brandId + "%26" + modelId
  const filteredModels = useMemo(() => {
    const modelNameObj = models.find((model) => model.brandId === brandId)
    setModelName(modelNameObj?.name)
    return models.filter((model) => model.brandId === brandId)
  }, [brandId, models])
  return (
    <Fragment>
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
      
      <Link href={{pathname: brandName + "&" + modelName}}>
        <button className='mt-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>Search</button>
      </Link>

      <Link href={'/'}>
        <button className='mt-5 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded'>Reset</button>
      </Link>

      <Link href={'/car/new'}>
        <button className='mt-5 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded'>Add New Car</button>
      </Link>
      
    </Fragment>
    
  )
}

export default BrandAndModelFormFields
