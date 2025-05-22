import { useState } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Programare from "./programare";

export default function Index() {
  const [openModal, setOpenModal] = useState(false) 
  return (
    <SafeAreaView>
      <Pressable
        onPress={() => setOpenModal(true)}
        style={{
          backgroundColor: 'green',
          padding: 10,
          borderRadius: 5,
          margin: 10
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Open Program</Text>
      </Pressable>
      <Programare 
      programModal={openModal}
      closeProgramModal={()=>{
        setOpenModal(!openModal)
      }}
      />
    </SafeAreaView>
  );
}
