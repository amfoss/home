"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import image from '../../../../public/placeholder.png'
import git from '../../../../public/githubAuth.png'
import info from '../../../../public/personal-info.png'
import graph from '../../../../public/graph.png'
import chart from '../../../../public/chart.png'

interface MemberDetails {
    id: number;
    year: number;
    rollNo: string;
    name: string;
    track: string;
    email: string;
    hostel: string;
    discordId: string;
    macAddress: string;
}

const members : MemberDetails[] = [
    {
      name: "Shria M Nair",
      email: "shrianair22@gmail.com",
      discordId: "1011264047250944060",
      macAddress: "d8:c0:a6:45:fe:a5",
      rollNo: "AM.SC.U4CSE23257",
      id: 42,
      year: 2,
      hostel: "Nila",
      track: "null"
    },
    {
      name: "John Yohan Skaria",
      email: "johnyohanskaria72@gmail.com",
      discordId: "1142448151085731941",
      macAddress: "3c:e9:f7:d3:97:df",
      rollNo: "AM.SC.U4CSE23224",
      id: 43,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "Abhinav M",
      email: "abhinav051017@gmail.com",
      discordId: "984116143432302592",
      macAddress: "70:a8:d3:c1:26:c2",
      rollNo: "AM.SC.U4CSE23302",
      id: 2,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "G O Ashwin Praveen",
      email: "ashwinpraveengo@gmail.com",
      discordId: "1144266373699227658",
      macAddress: "cc:47:40:9b:33:6a",
      rollNo: "AM.SC.U4CSE23027",
      id: 6,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "Souri S",
      email: "souris8805@gmail.com",
      discordId: "1144229035405230151",
      macAddress: "10:b1:df:ef:3b:23",
      rollNo: "AM.SC.U4AIE23151",
      id: 8,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "Aman V. Shafeeq",
      email: "notifyamanvs@gmail.com",
      discordId: "767636699077410837",
      macAddress: "a4:f9:33:4d:d2:ad",
      rollNo: "AM.SC.U4CSE23305",
      id: 7,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "Anamika V Menon",
      email: "anamikavmenon1@gmail.com",
      discordId: "1144476612470001836",
      macAddress: "14:7d:da:89:88:84",
      rollNo: "AM.SC.U4CSE23206",
      id: 34,
      year: 2,
      hostel: "Nila",
      track: "null"
    },
    {
      name: "Hridesh MG",
      email: "hridesh699@gmail.com",
      discordId: "303910160466837504",
      macAddress: "50:28:4a:22:79:e1",
      rollNo: "AM.SC.U4CSE23322",
      id: 1,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "Swayam Agrahari",
      email: "swayamagrahari1@gmail.com",
      discordId: "1145554861249802290",
      macAddress: "b4:8c:9d:65:53:73",
      rollNo: "AM.SC.U4CSE23073",
      id: 10,
      year: 2,
      hostel: "NA",
      track: "null"
    },
    {
      name: "Rihaan B H",
      email: "rihaan1810@gmail.com",
      discordId: "1112279194928418897",
      macAddress: "70:d8:23:27:f5:79",
      rollNo: "AM.EN.U4RAE23036",
      id: 12,
      year: 2,
      hostel: "Prasadam",
      track: "null"
    },
    {
      name: "Atharva Unnikrishnan Nair",
      email: "atharvanair04@gmail.com",
      discordId: "756123262118789160",
      macAddress: "2c:3b:70:58:74:f1",
      rollNo: "AM.SC.U4CSE23109",
      id: 13,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "Kartikey Singh",
      email: "kartikeys410@gmail.com",
      discordId: "471693902588411924",
      macAddress: "70:9c:d1:98:f3:32",
      rollNo: "AM.EN.U4EAC22033",
      id: 17,
      year: 3,
      hostel: "Pranavam",
      track: "null"
    },
    {
      name: "Satvik Mishra",
      email: "satvmishi@gmail.com",
      discordId: "538689852212903938",
      macAddress: "f4:3b:d8:4e:80:40",
      rollNo: "AM.EN.U4AIE22148",
      id: 18,
      year: 3,
      hostel: "Prasadam",
      track: "null"
    },
    {
      name: "Siddharth Menon",
      email: "mesinodd@gmail.com",
      discordId: "346148004002267156",
      macAddress: "14:13:33:c6:28:43",
      rollNo: "AM.EN.U4AIE22048",
      id: 19,
      year: 3,
      hostel: "Prasadam",
      track: "null"
    },
    {
      name: "Ivin Joel Abraham",
      email: "ivinjabraham@gmail.com",
      discordId: "922437783459602433",
      macAddress: "70:1a:b8:75:a4:c2",
      rollNo: "AM.EN.U4AIE22123",
      id: 20,
      year: 3,
      hostel: "Prasadam",
      track: "null"
    },
    {
      name: "Farzana Shajahan",
      email: "farzana.shjhn@gmail.com",
      discordId: "319071281771446282",
      macAddress: "a4:b1:c1:06:10:ad",
      rollNo: "AM.EN.U4CSE22121",
      id: 21,
      year: 3,
      hostel: "Nila",
      track: "null"
    },
    {
      name: "Kshitij Thareja",
      email: "kshitijthareja03@gmail.com",
      discordId: "856387412266713108",
      macAddress: "28:6b:35:d5:ed:cd",
      rollNo: "AM.EN.U4CSE22238",
      id: 22,
      year: 3,
      hostel: "Prasadam",
      track: "null"
    },
    {
      name: "Chinmay Ajith",
      email: "chinmayajith30@gmail.com",
      discordId: "891581154765979668",
      macAddress: "e0:2e:0b:df:f3:d1",
      rollNo: "AM.SC.U4CSE23020",
      id: 23,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "Akshaya Krishnan",
      email: "akshayakrishnan318@gmail.com",
      discordId: "1035061252331937863",
      macAddress: "54:6c:eb:d0:41:c0",
      rollNo: "AM.EN.U4AIE22108",
      id: 24,
      year: 3,
      hostel: "Nila",
      track: "null"
    },
    {
      name: "Pakhi Banchalia",
      email: "pakhibanchalia2418@gmail.com",
      discordId: "796430094973141004",
      macAddress: "1c:bf:c0:e0:ae:f9",
      rollNo: "AM.EN.U4AIE21049",
      id: 25,
      year: 4,
      hostel: "Day Scholar",
      track: "null"
    },
    {
      name: "Vishnu Tejas E",
      email: "vishnutejase@gmail.com",
      discordId: "788733212406448129",
      macAddress: "d0:ab:d5:22:be:56",
      rollNo: "AM.SC.U4AIE23164",
      id: 26,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "Mukund Menon",
      email: "mukundmenon12005@gmail.com",
      discordId: "525243511180623872",
      macAddress: "10:68:38:C3:41:88",
      rollNo: "AM.SC.U4CSE23336",
      id: 27,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "Shrivaths S Nair",
      email: "shrivaths44kunju@gmail.com",
      discordId: "1144200418986033152",
      macAddress: "b4:8c:9d:65:96:9b",
      rollNo: "AM.SC.U4AIE23148",
      id: 28,
      year: 2,
      hostel: "Prasadam",
      track: "null"
    },
    {
      name: "Manas Varma K",
      email: "manasvarma944@gmail.com",
      discordId: "760051655634190337",
      macAddress: "c0:3c:59:19:4f:d8",
      rollNo: "AM.SC.U4AIE23126",
      id: 29,
      year: 2,
      hostel: "Prasadam",
      track: "null"
    },
    {
      name: "Kirti Sikka",
      email: "kirtisikka972@gmail.com",
      discordId: "809680260702142504",
      macAddress: "d0:88:0c:7d:65:73",
      rollNo: "AM.EN.U4AIE22126",
      id: 37,
      year: 3,
      hostel: "Nila",
      track: "null"
    },
    {
      name: "Harigovind C B",
      email: "harigovindbiju@gmail.com",
      discordId: "526702765716668416",
      macAddress: "40:1a:58:6b:92:4f",
      rollNo: "AM.EN.U4AIE22119",
      id: 38,
      year: 3,
      hostel: "Prasadam",
      track: "null"
    },
    {
      name: "Shrisharanyan Vasu",
      email: "shrisharanyan.clg@gmail.com",
      discordId: "1037190174939037807",
      macAddress: "2c:3b:70:9d:ed:e7",
      rollNo: "AM.EN.U4AIE22150",
      id: 39,
      year: 3,
      hostel: "Prasadam",
      track: "null"
    },
    {
      name: "Aniketh Vijesh",
      email: "anikethvij464@gmail.com",
      discordId: "953210439335034920",
      macAddress: "38:7a:0e:cf:fa:c6",
      rollNo: "AM.EN.U4AIE22009",
      id: 41,
      year: 3,
      hostel: "Prasadam",
      track: "null"
    },
    {
      name: "Navaneeth B",
      email: "navaneeth0041@gmail.com",
      discordId: "1144234678740598844",
      macAddress: "e0:d0:45:91:fc:17",
      rollNo: "AM.SC.U4CSE23138",
      id: 11,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "Vishnu Mohandas",
      email: "vishnu240404@gmail.com",
      discordId: "1145054845817061427",
      macAddress: "34:6f:24:30:71:07",
      rollNo: "AM.SC.U4CSE23369",
      id: 5,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "Aadarsh Mahesh K",
      email: "aadarshmaheshk@gmail.com",
      discordId: "758363520986775672",
      macAddress: "F8:89:D2:89:EC:BF",
      rollNo: "AM.EN.U4EAC24001",
      id: 51,
      year: 1,
      hostel: "Prahladha-B",
      track: "null"
    },
    {
      name: "Rohith K Pradeep",
      email: "rohithkpradeep@gmail.com",
      discordId: "814523718125486132",
      macAddress: "b8:1e:a4:33:12:cb",
      rollNo: "AM.SC.U4CSE24350",
      id: 47,
      year: 1,
      hostel: "Vrindavan",
      track: "null"
    },
    {
      name: "Dande Ganeswar",
      email: "dandegani57@gmail.com",
      discordId: "750960922809598003",
      macAddress: "84:2f:57:2b:55:28",
      rollNo: "AM.SC.U4CSE23119",
      id: 44,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "KK Surendran",
      email: "kksurendran104@gmail.com",
      discordId: "1131504256394997820",
      macAddress: "9c:58:84:87:cf:58",
      rollNo: "AM.SC.U4CSE23325",
      id: 4,
      year: 2,
      hostel: "NA",
      track: "null"
    },
    {
      name: "Gautham Mohanraj",
      email: "gouthammohanraj@gmail.com",
      discordId: "1117368877542801458",
      macAddress: "9c:58:84:37:de:b7",
      rollNo: "AM.SC.U4CSE23319",
      id: 9,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "U Karthik Krishna",
      email: "karthikkrishnau10@gmail.com",
      discordId: "719180906614620172",
      macAddress: "A8:E2:91:4A:37:F8",
      rollNo: "AM.SC.U4AIE24052",
      id: 49,
      year: 1,
      hostel: "Vrindavan",
      track: "null"
    },
    {
      name: "Dheeraj M",
      email: "motupallidheeraj@gmail.com",
      discordId: "658843290325614605",
      macAddress: "30:05:05:63:F2:54",
      rollNo: "AM.SC.U4CSE23150",
      id: 45,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "Shravya K Suresh",
      email: "ksshrav2005@gmail.com",
      discordId: "768094607237447711",
      macAddress: "08:9d:f4:b5:20:0c",
      rollNo: "AM.SC.U4CSE23256",
      id: 35,
      year: 2,
      hostel: "Nila",
      track: "null"
    },
    {
      name: "Sabarinath J",
      email: "sabarinath34215@gmail.com",
      discordId: "709514256151740486",
      macAddress: "70:08:94:12:FC:65",
      rollNo: "AM.SC.U4AIE23054",
      id: 14,
      year: 2,
      hostel: "Day Scholar",
      track: "null"
    },
    {
      name: "Hemanth Krishnakumar",
      email: "hemanthkrishnakumar@gmail.com",
      discordId: "538636213750464515",
      macAddress: "2c:7b:a0:2e:d5:8d",
      rollNo: "AM.EN.U4CSE22227",
      id: 15,
      year: 3,
      hostel: "Prasadam",
      track: "null"
    },
    {
      name: "Harikrishna TP",
      email: "tpharikrishna5@gmail.com",
      discordId: "1144288502167650335",
      macAddress: "ac:50:de:86:d2:b9",
      rollNo: "AM.SC.U4CSE23321",
      id: 3,
      year: 2,
      hostel: "Ashokam",
      track: "null"
    },
    {
      name: "Peechara Harshith Rao",
      email: "peecharaharshith@gmail.com",
      discordId: "996738557471371364",
      macAddress: "F8:FE:5E:A4:E4:58",
      rollNo: "AM.SC.U4AIE24135",
      id: 48,
      year: 1,
      hostel: "Vrindavan",
      track: "null"
    },
    {
      name: "Keerthan.K.K",
      email: "tkthulasimandiram@gmail.com",
      discordId: "1139088368500744214",
      macAddress: "FC:2A:46:FD:37:2D",
      rollNo: "AM.SC.U4CYS23025",
      id: 30,
      year: 2,
      hostel: "Kailasam",
      track: "null"
    },
    {
      name: "Malavika M",
      email: "malavikamanju4@gmail.com",
      discordId: "789500131661709374",
      macAddress: "94:BB:43:1B:67:55",
      rollNo: "AM.SC.U4AIE24127",
      id: 52,
      year: 1,
      hostel: "Kaveri",
      track: "null"
    },
    {
      name: "Naveen",
      email: "naveensrinivas282@gmail.com",
      discordId: "1108777414772916274",
      macAddress: "B0:BE:83:14:64:23",
      rollNo: "AM.SC.U4CSE24249",
      id: 53,
      year: 1,
      hostel: "Vrindavan",
      track: "null"
    },
    {
      name: "Rohit Reddy Anumolu",
      email: "5668.rohit@gmail.com",
      discordId: "1266772831744692297",
      macAddress: "10:5B:AD:3E:B6:8D",
      rollNo: "AM.SC.U4CSE24209",
      id: 57,
      year: 1,
      hostel: "Vrindavan",
      track: "web"
    },
    {
      name: "Nandu Krishna M",
      email: "nandukrishna.mpm@gmail.com",
      discordId: "925674161144225873",
      macAddress: "B4:B5:B6:F2:C4:79",
      rollNo: "AM.SC.U4CSE24240",
      id: 59,
      year: 1,
      hostel: "Vrindavan",
      track: "null"
    },
    {
      name: "K Sravan",
      email: "kotasravan122706@gmail.com",
      discordId: "837954174700224532",
      macAddress: "B8:1E:A4:E2:62:0B",
      rollNo: "AM.SC.U4AID24023",
      id: 63,
      year: 1,
      hostel: "Prahaladha- A",
      track: "null"
    },
    {
      name: "Rohith A P",
      email: "rohithworks07@gmail.com",
      discordId: "925303772601786410",
      macAddress: "E0:2E:0B:D4:16:97",
      rollNo: "AM.EN.U4ECE24051",
      id: 64,
      year: 1,
      hostel: "Prahladha-B",
      track: "null"
    },
    {
      name: "Anandajith S",
      email: "anandajiths2006@gmail.com",
      discordId: "761509605170872330",
      macAddress: "F8:54:F6:1D:88:4F",
      rollNo: "AM.SC.U4CSE24310",
      id: 54,
      year: 1,
      hostel: "Vrindavan",
      track: "null"
    },
    {
      name: "Chandra Mouli P",
      email: "mouli7667@gmail.com",
      discordId: "1265880467047976970",
      macAddress: "74:0E:A4:7F:DD:E1",
      rollNo: "AM.SC.U4CSE24248",
      id: 55,
      year: 1,
      hostel: "Vrindavan",
      track: "null"
    },
    {
      name: "Jagadeeshwar Reddy Kota",
      email: "kota.jagadesh123@gmail.com",
      discordId: "1266974743345627197",
      macAddress: "D0:39:57:C4:4C:2F",
      rollNo: "AM.SC.U4AID24019",
      id: 58,
      year: 1,
      hostel: "PRAHALADA - A",
      track: "null"
    },
    {
      name: "B. Teja Sai Charan",
      email: "tejaasaye@gmail.com",
      discordId: "1272867406334918656",
      macAddress: "C0:35:32:54:7E:3D",
      rollNo: "AM.SC.U4CSE24271",
      id: 56,
      year: 1,
      hostel: "Vrindavan",
      track: "null"
    },
    {
      name: "Nishtha Jain",
      email: "jnishtha305@gmail.com",
      discordId: "1253236550033215542",
      macAddress: "64:79:F0:36:B3:57",
      rollNo: "AM.SC.U4AID24032",
      id: 65,
      year: 1,
      hostel: "Kaveri",
      track: "null"
    },
    {
      name: "Khushal Chitturi",
      email: "kc9282016@gmail.com",
      discordId: "1283019669883719742",
      macAddress: "94:bb:43:82:c0:c0",
      rollNo: "AM.SC.U4CSE24115",
      id: 61,
      year: 1,
      hostel: "Vrindavan",
      track: "null"
    }
  ]

const MemberDetails = () => {
    const params = useParams(); // Use useParams to get the dynamic route parameter
    const memberId = parseInt(params.memberId as string);
    const [memberDetails, setMemberDetails] = useState<MemberDetails | null>(null);
      

    useEffect(() => {
        if (!isNaN(memberId)) {
          const data = members.find((member) => member.id === memberId);
          if (data) {
            setMemberDetails(data);
          }
        }
      }, [memberId]);

    if (!memberDetails) return <div>Loading...</div>;

    return (
        <div>
            <h1 className='text-5xl text-white font-medidum mx-14 mt-12 mb-6' >Members / <b>{memberDetails.name}</b></h1>
            <div className='mr-20'>
                <hr className='mx-12 pr-10'/>
            </div>
            <div className='my-10 flex'>
                <div className='w-1/2 px-4'>
                    <div className='flex items-center'>
                        <div className='ml-10'>
                            <Image src={image} className='my-12' alt='place' width={200}  />
                        </div>
                        <div className='ml-8 text-white text-left'>
                            <div className='text-4xl font-semibold'>
                                {memberDetails.name}
                            </div>
                            <div className='text-lg mt-2 text-gray-400'>
                                {memberDetails.rollNo}
                            </div>
                            <div>
                                <Image src={git} alt='git' width={50} height={50} className='mt-5'/>
                            </div>
                        </div>

                            {/* Rotated Label */}
                        <div className='ml-auto mr-6'>
                            <div className='transform -rotate-90 text-yellow-600 font-bold text-4xl whitespace-nowrap capitalize'>
                                {memberDetails.track}
                            </div>
                        </div>
                    </div>
                    <hr className='my-7 mx-8'/>
                    <div style={{ width: '100%' }}>
                        <div className='flex'>
                            <Image src={info} alt='info' className='ml-10' height={30} width={50}/>
                            <h2 className='mb-2 text-4xl ml-8 text-white font-bold'>Personal Info</h2>
                        </div>
                        <div className="w-6/6 ml-12 mr-14 my-8 text-2xl">
                            <div className="flex justify-between py-2 mb-2">
                                <span className="text-left text-gray-400 font-bold">Hostel : </span>
                                <span className="text-right text-white ">{memberDetails.hostel}</span>
                            </div>
                            <div className="flex justify-between py-2 mb-2">
                                <span className="text-left text-gray-400 font-bold">Discord Id : </span>
                                <span className="text-right text-white">{memberDetails.discordId}</span>
                            </div>
                            <div className="flex justify-between py-2 mb-2">
                                <span className="text-left text-gray-400 font-bold">Email Id : </span>
                                <span className="text-right text-white">{memberDetails.email}</span>
                            </div>
                        </div>

                        <hr className='my-10 mx-8'/>

                    </div>


                </div>

                <div className='w-1/2 px-4'>
                    <div>
                        <h1 className='text-4xl mb-6 ml-20 font-bold text-white'>Constancy Graph</h1>
                        <Image src={graph} width={620} alt='graph' className='ml-20'/>
                    </div>
                    <div>
                        <h1 className='text-4xl my-10 ml-20 font-bold text-white'>Github Activity</h1>
                        {/* <Image src={chart} alt='chart' width={620} className='ml-20'/> */}
                    </div>
                </div>
            </div>

            {/* Render more detailed information as needed */}
        </div>
    );
};

export default MemberDetails;
