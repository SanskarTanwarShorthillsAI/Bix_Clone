import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    },
    {
        key: 'register',
        path: `${AUTH_PREFIX_PATH}/register`,
        component: React.lazy(() => import('views/auth-views/authentication/register')),
    },
    {
        key: 'forgot-password',
        path: `${AUTH_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
    }
]

export const protectedRoutes = [
    {
        key: 'dashboard',
        path: `${APP_PREFIX_PATH}/dashboard`,
        component: React.lazy(() => import('views/app-views/dashboards/default')),
    },
    {
        key: 'customer',
        path: `/customer`,
        component: React.lazy(() => import('views/app-views/dashboards/customer')),
    },
    {
        key: 'product',
        path: `/products`,
        component: React.lazy(() => import('views/app-views/dashboards/product')),
    }
]