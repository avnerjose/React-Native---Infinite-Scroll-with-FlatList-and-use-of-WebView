import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Main from './pages/main/index'
import Product from './pages/product'

const AppStack = createStackNavigator()

export default function Routes() {

    return (
        <NavigationContainer>
            <AppStack.Navigator >
                <AppStack.Screen name="main" component={Main}
                    options={{
                        title: 'JSHunt',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#DA552F'
                        },
                        headerTintColor: "#FFF",
                    }}
                />
                <AppStack.Screen name="product" component={Product}
                    options={({ route }) => ({
                        title: route.params.product.title,
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#DA552F'
                        },
                        headerTintColor: "#FFF",
                    })}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    )

}
