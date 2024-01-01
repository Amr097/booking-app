import { defineStore } from 'pinia'
import { auth, onAuthStateChanged, usersCollection } from '../services/firebase.js'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ref } from 'vue'

export default defineStore('user', () => {
  const firstLogin = ref({ modal: false })
  const isLogged = ref({ logged: false })
  const userTrips = ref({ data: [] })
  const userId = ref({ value: '' })

  const userLogin = () => {
    firstLogin.value.modal = true
  }

  const setUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLogged.value.logged = true
      } else {
        isLogged.value.logged = false
      }
    })
  }

  const fetchUserTrips = (isLoading, errMessage) => {
    isLoading.value.state = true
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        userId.value.value = user.uid
        try {
          const fetchUserRef = await getDoc(doc(usersCollection, user.uid))

          if (fetchUserRef.exists()) {
            const trips = fetchUserRef.data().trips
            if (trips.length === 0) {
              errMessage.value.state = true
              errMessage.value.value = "૮₍•᷄ ࡇ •᷅₎ა Your don't have any trips reserved yet."
              userTrips.value.data = trips
              isLoading.value.state = false
              return
            }
            const sortedTrips = fetchUserRef.data().trips.reverse()
            userTrips.value.data = sortedTrips
          }
        } catch (error) {
          errMessage.value.state = true
          isLoading.value.state = false
        }

        isLoading.value.state = false
      }
    })
  }

  const deleteTrip = async (id, index) => {
    const userTripsCpy = [...userTrips.value.data]

    userTripsCpy.splice(index, 1)

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await setDoc(doc(usersCollection, user.uid), { trips: userTripsCpy })
          userTrips.value.data.splice(index, 1)
        } catch (error) {
          console.log(error)
        }
      }
    })
  }
  return {
    userLogin,
    firstLogin,
    setUserStatus,
    isLogged,
    fetchUserTrips,
    userTrips,
    userId,
    deleteTrip
  }
})
