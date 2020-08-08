import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import api from '../../services/api'
import styles from './styles'

export default function Main({ navigation }) {

    const [docsState, setDocs] = useState([])
    const [page, setPage] = useState(1)
    const [productInfo, setProductInfo] = useState({})

    useEffect(() => {
        loadProducts()
    }, [])

    async function loadProducts(page = 1) {
        const response = await api.get(`/products?page=${page}`)

        const { docs, ...productInfo } = response.data

        setDocs([...docsState, ...docs])
        setProductInfo(productInfo)
        setPage(page)
    }

    function renderItem({ item }) {

        return (
            <View style={styles.productContainer}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>

                <TouchableOpacity onPress={() => navigation.navigate('product', { product: item })}
                    style={styles.productButton}>
                    <Text style={styles.productButtonText}>Acessar</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function loadMore() {

        if (page === productInfo.pages)
            return

        const pageNumber = page + 1

        loadProducts(pageNumber)
    }

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.list}
                data={docsState}
                keyExtractor={item => item._id}
                renderItem={renderItem}
                onEndReached={loadMore}
                onEndReachedThreshold={0.2} />
        </View>
    )
}

