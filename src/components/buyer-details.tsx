import React, { ChangeEvent, useState } from 'react'

import Icon from './icons'
import { join } from '../utils'

const fieldClasses = join([
    'border-gray-200',
    'border',
    'field',
    'flex-col',
    'flex',
    'h-32',
    'justify-around',
    'neu-flat-light',
    'p-5',
    'relative',
    'rounded-lg',
    'text-gray-700',
    'w-full'
])

const inputClasses = join(['neu-pressed-light', 'p-3', 'rounded-lg', 'w-full'])

type NameType = 'name' | 'email' | 'confirm' | 'address' | 'state' | 'phone'

interface Field {
    label: string
    name: NameType
    icon: string
    placeholder: string
    modifier?: (args: any) => void
}

const fields: Field[] = [
    {
        label: 'Name',
        name: 'name',
        icon: 'person',
        placeholder: 'Froddo Baggins'
    },
    {
        label: 'Email',
        name: 'email',
        icon: 'envelope',
        placeholder: 'fbaggins@aol.com'
    },
    {
        label: 'Confirm Email',
        name: 'confirm',
        icon: 'envelope',
        placeholder: 'fbaggins@aol.com'
    },
    {
        label: 'Address',
        name: 'address',
        icon: 'marker',
        placeholder: '123 Shire Way.'
    },
    {
        label: 'State',
        name: 'state',
        icon: 'map',
        placeholder: 'CA'
    },
    {
        label: 'Phone',
        name: 'phone',
        icon: 'phone',
        placeholder: '310-555-5961',
        modifier: (text: string) => {
            return text.length === 3 || text.length === 7 ? `${text}-` : text
        }
    }
]

interface Errors {
    name: string | null
    email: string | null
    confirm: string | null
    address: string | null
    state: string | null
    phone: string | null
}

const initialState = {
    name: '',
    email: '',
    confirm: '',
    address: '',
    state: '',
    phone: '',
    errors: {} as Errors
}

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i) // prettier-ignore
const validPhoneRegex = RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)

const BuyerDetailsComponent: React.FC = props => {
    const [state, setState] = useState(initialState)

    const validate = (name: NameType) => () => {
        const { errors } = state
        const value = state[name]

        // prettier-ignore
        switch (name) {
            case 'name':
                errors.name = value.length < 2 ? 'Name too short' : null
                break
            case 'email':
                errors.email = !validEmailRegex.test(value)
                    ? 'Invalid email'
                    : null
                break
            case 'confirm':
                errors.confirm = state.email !== value
                        ? 'Email does not match'
                        : null
                break
            case 'address':
                errors.address = value.trim().split(' ').length < 3
                        ? 'Address too short'
                        : null
                break
            case 'state':
                errors.state = value.length !== 2
                        ? 'Invalid state' 
                        : null
                break
            case 'phone':
                errors.phone = !validPhoneRegex.test(value)
                        ? 'Invalid phone'
                        : null
                break
                default:
                break
        }

        setState(prev => ({ ...prev, errors }))
    }

    const handleChange = (e: ChangeEvent, modifier: any) => {
        e.preventDefault()
        const { name, value } = e.target as HTMLInputElement

        setState(prev => ({
            ...prev,
            [name]: modifier ? modifier(value) : value
        }))
    }

    return (
        <div className='input-details grid grid-cols-3 gap-4 py-5 px-10 w-full'>
            {fields.map((f, i) => (
                <div className={fieldClasses} key={i}>
                    {state.errors[f.name] && (
                        <span className='text-red-600 absolute top-0 left-0 ml-5 mt-1'>
                            {state.errors[f.name]}
                        </span>
                    )}
                    <label className='flex justify-between'>
                        {f.label}
                        <span className='icon-wrap h-6 inline-block w-6'>
                            <Icon
                                className='h-full w-full text-red-500'
                                name={f.icon}
                            />
                        </span>
                    </label>
                    <input
                        type='text'
                        className={inputClasses}
                        name={f.name}
                        placeholder={f.placeholder}
                        onChange={e => handleChange(e, f.modifier)}
                        value={state[f.name]}
                        onBlur={validate(f.name)}
                        formNoValidate
                    />
                </div>
            ))}
        </div>
    )
}

export default BuyerDetailsComponent
