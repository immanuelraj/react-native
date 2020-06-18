import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StatusBar, FlatList, Button, View, Text } from 'react-native'

export default class DetailsScreen extends Component {
  constructor(props){
    super(props);
    this.state = {customer:"Immanuel Durairaj", address: "Nethaji Nagar, Magadi Road, Bangalore - 560026",
    ordered_items: [{id:1, name:'Apple', quantity:1, price:123.23},
    {id:2, name:'Milk', quantity:1, price:123.23},
    {id:3, name:'Cola', quantity:1, price:123.23},],
    phone: "9837838383", total_price: 213.32,
    };
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
        <View style={{justifyContent: 'space-between', backgroundColor: '#f2f2f2'}}>
          <View style={{padding:10}}>
            <View style={{backgroundColor:"white", borderRadius:10, padding:10}} >
              <Text style={{fontWeight: "bold", fontSize:20}}>Customer Name</Text>
              <Text style={{fontSize:20}}>{this.state.customer}</Text>
              <Text style={{fontWeight: "bold", paddingTop:10, fontSize:20}}>Delivery Address</Text>
              <Text style={{fontSize:20}}>{this.state.address}</Text>
              <Text style={{fontWeight: "bold", paddingTop:10, fontSize:20}}>Phone</Text>
              <Text style={{fontSize:20}}>{this.state.phone}</Text>
            </View>
          </View>
          <Text style={{fontSize:20, paddingLeft:20, paddingTop:10}}>Ordered Items</Text>
          <View style={{padding:10}} >
            {this.state.ordered_items.map(item => (
              <View key={item.id} style={{flex: 1, flexDirection:"row", height:60, borderBottomWidth:5, borderRadius:10, backgroundColor:"white", borderColor:"#f2f2f2", justifyContent:"space-around", alignItems:"center"}}>
                <Text style={{fontSize:20}}>{item.name}</Text>
                <Text style={{fontSize:20}}>{item.quantity}</Text>
                <Text style={{fontSize:20}}>{item.price} INR</Text>
              </View>
            ))}
          </View>
          <View style={{padding:10}} >
            <View style={{flex: 1, flexDirection:"row", height:60, padding:10, borderRadius:10, shadowRadius:10, backgroundColor:"white", borderColor:"#f2f2f2", justifyContent:"space-around", alignItems:"center"}}>
              <Text style={{fontWeight: "bold", fontSize:20}}>Total Price</Text>
              <Text style={{fontWeight: "bold", fontSize:20}}>{this.state.total_price} INR</Text>
            </View>
          </View>
          <View style={{padding:10}}>
            <View style={{minHeight: 60, backgroundColor: '#66ff66', borderRadius:10, justifyContent:"space-around", alignItems:"center"}}>
              <Text style={{fontWeight: "bold", fontSize:20}}>Mark As Delivered</Text>
            </View>
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
} 