/* ==========================================================================
   Student Backlog Tracker — Application Logic
   Uses localStorage for persistence. No server required.
   ========================================================================== */

// ─── Data Layer ──────────────────────────────────────────────────────────────

const STORAGE_KEY = 'backlog_tracker_data_v3';

/** Real data imported from Excel */
const SEED_DATA = [
  { name: 'ADITYA KUMAR', rollNo: '25AI1001', email: 'aditya.kumar_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'ADITYA SINGHAL', rollNo: '25AI1002', email: 'aditya.singhal_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'AJEET KUMAR YADAV', rollNo: '25AI1003', email: 'ajeet.yadav_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'AKHIL JOBBI', rollNo: '25AI1004', email: 'akhil.jobbi_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'AKSHIT KUMAR', rollNo: '25AI1005', email: 'akshit.kumar_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'ANIK GHARAMI', rollNo: '25AI1006', email: 'anik.gharami_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'ANIKET SINGH', rollNo: '25AI1007', email: 'aniket.singh_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'ANURAG SINGH', rollNo: '25AI1008', email: 'anurag.singh_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'ARAV KUMAR YADAV', rollNo: '25AI1009', email: 'arav.yadav_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'ARUSHI AWASTHI', rollNo: '25AI1010', email: 'arushi.awasthi_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'AYUSH KUMAR SINGH', rollNo: '25AI1011', email: 'ayush.singh_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'AYUSH YADAV', rollNo: '25AI1012', email: 'ayush.yadav_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'BANOTH REVANTH', rollNo: '25AI1013', email: 'banoth.revanth_btech25@gsv.ac.in', course: 'C programming', sem: 1, presentSem: 3, credit: 3 },
  { name: 'BHANWAR LAL', rollNo: '25AI1014', email: 'bhanwar.lal_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'BHUT MEET UMESHBHAI', rollNo: '25AI1015', email: 'bhut.meet_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'BOLLEPALLI ISHANTH CHANDRA', rollNo: '25AI1016', email: 'bollepalli.ishanth_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'DIXIT PATEL', rollNo: '25AI1017', email: 'dixit.patel_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'GAVARA MAHESH', rollNo: '25AI1018', email: 'gavara.mahesh_btech25@gsv.ac.in', course: 'C programming', sem: 1, presentSem: 3, credit: 3 },
  { name: 'GULSHAN KUMAR SHAH', rollNo: '25AI1019', email: 'gulshan.shah_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'KARTIKEYA JAIN', rollNo: '25AI1020', email: 'kartikeya.jain_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'LAKDAWALA FARDIN', rollNo: '25AI1021', email: 'lakdawala.fardin_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'LAKSHYA KUMAWAT', rollNo: '25AI1022', email: 'lakshya.kumawat_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'LOVE RAJAWAT', rollNo: '25AI1023', email: 'love.rajawat_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'MALI DHANASHRI SATISH', rollNo: '25AI1024', email: 'mali.dhanshri_btech25@gsv.ac.in', course: 'Engineering Mathematics I', sem: 1, presentSem: 3, credit: 4 },
  { name: 'MALI DHANASHRI SATISH', rollNo: '25AI1024', email: 'mali.dhanshri_btech25@gsv.ac.in', course: 'C programming', sem: 1, presentSem: 3, credit: 3 },
  { name: 'MANAS SACHIN KHAPARE', rollNo: '25AI1025', email: 'manas.khapare_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'MANISH KUMAR', rollNo: '25AI1026', email: 'manish.kumar_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'MAYANK', rollNo: '25AI1027', email: 'mayank_btech25@gsv.ac.in', course: 'C programming', sem: 1, presentSem: 3, credit: 3 },
  { name: 'NAMAN JAIN', rollNo: '25AI1028', email: 'naman.jain_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'NAVADIYA JILS HASMUKHBHAI', rollNo: '25AI1029', email: 'navadiya.jils_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'PARIDHI NIMBARK', rollNo: '25AI1030', email: 'paridhi.nimbark_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'PATEL TRISHA PANKIT', rollNo: '25AI1031', email: 'patel.trisha_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'PIYUSH RAJ', rollNo: '25AI1032', email: 'piyush.raj_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'PRASAD SAURAV RAMANAND', rollNo: '25AI1033', email: 'prasad.saurav_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'PRASHANT', rollNo: '25AI1034', email: 'prashant_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'PRINCE', rollNo: '25AI1035', email: 'prince_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'PRIYAM ALOK', rollNo: '25AI1036', email: 'priyam.alok_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'RAJKUMAR', rollNo: '25AI1037', email: 'rajkumar_btech25@gsv.ac.in', course: 'C programming', sem: 1, presentSem: 3, credit: 3 },
  { name: 'RAKESH KUMAR MALIK', rollNo: '25AI1038', email: 'rakesh.malik_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'RASHIBH YADAV', rollNo: '25AI1039', email: 'rashibh.yadav_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'RUDRANSH MISHRA', rollNo: '25AI1040', email: 'rudransh.mishra_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'RUTVIK', rollNo: '25AI1041', email: 'rutvik_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'SAHITYA PANWAR', rollNo: '25AI1042', email: 'sahitya.panwar_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'SAHU VIBEK APURBA', rollNo: '25AI1043', email: 'sahu.vibek_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'SANJEEVANA J', rollNo: '25AI1044', email: 'sanjeevana.j_btech25@gsv.ac.in', course: 'C programming', sem: 1, presentSem: 3, credit: 3 },
  { name: 'SATWIK PRAKASH', rollNo: '25AI1045', email: 'satwik.prakash_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'SAUMYA SHARMA', rollNo: '25AI1046', email: 'saumya.sharma_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'SHORYA JAIN', rollNo: '25AI1048', email: 'shorya.jain_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'SHRIYANSH', rollNo: '25AI1049', email: 'shriyansh_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'SNEHANGSHU SARKAR', rollNo: '25AI1050', email: 'snehangshu.sarkar_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'STAVAN PRAKASH GAMIT', rollNo: '25AI1051', email: 'stavan.gamit_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'SUMIT KUMAR SINGH', rollNo: '25AI1052', email: 'sumit.singh_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'SURAJ PRAKASH', rollNo: '25AI1053', email: 'suraj.prakash_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'UMA SHARMA', rollNo: '25AI1055', email: 'uma.sharma_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'VIDHU SHARMA', rollNo: '25AI1056', email: 'vidhu.sharma_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'YOGESH YADAV', rollNo: '25AI1057', email: 'yogesh.yadav_btech25@gsv.ac.in', course: 'C programming', sem: 1, presentSem: 3, credit: 3 },
  { name: 'BHAVYA SONI', rollNo: '25AI1058', email: 'bhavya.soni_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'DEEPANSHI JAIN', rollNo: '25AI1059', email: 'deepanshi.jain_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'TESHAVI PODDAR', rollNo: '25AI1060', email: 'teshavi.poddar_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'SOHINI CHOWDHURY', rollNo: '25AI1061', email: 'sohini.chowdhury_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 3, credit: 0 },
  { name: 'ANMOL GUPTA', rollNo: '25AI1062', email: 'anmol.gupta_btech25@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Aafreen Shaikh', rollNo: '24AI001', email: 'aafreen.shaikh_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Aayush Praveen', rollNo: '24AI002', email: 'aayush.praveen_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Abhay Kumar Sahu', rollNo: '24AI003', email: 'abhay.sahu_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Abhinav Mishra', rollNo: '24AI004', email: 'abhinav.m_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Abhinav A Mishra', rollNo: '24AI005', email: 'abhinav.mishra_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Abhishek Karadia', rollNo: '24AI006', email: 'abhishek.karadia_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Aditya Kumar', rollNo: '24AI007', email: 'aditya.kumar_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Aman Kumar', rollNo: '24AI008', email: 'aman.kumar_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Aman Kumar Jha', rollNo: '24AI009', email: 'aman.jha_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Aman Sharma', rollNo: '24AI010', email: 'aman.sharma_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Ambrish', rollNo: '24AI011', email: 'ambrish.mankare_btech24@gsv.ac.in', course: 'DSA', sem: 3, presentSem: 5, credit: 3 },
  { name: 'Anuj Nagar', rollNo: '24AI012', email: 'anuj.nagar_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Arjit Prasad Das', rollNo: '24AI013', email: 'arjit.das_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Arpit Kaushik', rollNo: '24AI015', email: 'arpit.kaushik_btech24@gsv.ac.in', course: 'DSA LAB', sem: 3, presentSem: 5, credit: 1 },
  { name: 'Aryan Kumar Yadav', rollNo: '24AI016', email: 'aryan.yadav_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Bhavesh', rollNo: '24AI017', email: 'bhavesh.kumar_btech24@gsv.ac.in', course: 'Basic Electrical and Electronics Eng.', sem: 2, presentSem: 5, credit: 3 },
  { name: 'Bhavesh', rollNo: '24AI017', email: 'bhavesh.kumar_btech24@gsv.ac.in', course: 'Basic Electrical and Electronics Eng. Lab', sem: 2, presentSem: 5, credit: 1 },
  { name: 'Bommana Boina Drushadva Srinivas', rollNo: '24AI018', email: 'drushadva.srinivas_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Chevvakula Siddartha', rollNo: '24AI019', email: 'chevvakula.siddartha_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Chirag Jindani', rollNo: '24AI020', email: 'chirag.jindani_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Dhanya R', rollNo: '24AI021', email: 'dhanya.r_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Dipesh', rollNo: '24AI022', email: 'dipesh.singh_btech24@gsv.ac.in', course: 'DSA', sem: 3, presentSem: 5, credit: 3 },
  { name: 'Dipesh', rollNo: '24AI022', email: 'dipesh.singh_btech24@gsv.ac.in', course: 'C programming', sem: 1, presentSem: 5, credit: 3 },
  { name: 'Dipesh', rollNo: '24AI022', email: 'dipesh.singh_btech24@gsv.ac.in', course: 'Engineering Mathematics I', sem: 1, presentSem: 5, credit: 4 },
  { name: 'Divy Jain', rollNo: '24AI023', email: 'divy.jain_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Eka Chandu', rollNo: '24AI024', email: 'eka.chandu_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Giriraj', rollNo: '24AI025', email: 'giriraj.biradar_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Gopal Kumar Singh', rollNo: '24AI026', email: 'gopal.singh_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Harsh Bardhan Upadhyay', rollNo: '24AI027', email: 'harsh.upadhyay_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Harsh Trivedi', rollNo: '24AI028', email: 'harsh.trivedi_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Hemanshu', rollNo: '24AI029', email: 'hemanshu.kumar_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Hemant Malviya', rollNo: '24AI030', email: 'hemant.malviya_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Jadhav Vedant Virendra', rollNo: '24AI031', email: 'vedant.virendra_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Janumpalli Sriram Reddy', rollNo: '24AI032', email: 'janumpalli.reddy_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Kaustubh Suprabandh Sandeep', rollNo: '24AI033', email: 'kaustubh.suprabandh_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Kota Mahesh', rollNo: '24AI034', email: 'kota.mahesh_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Kuppam Deekshith', rollNo: '24AI035', email: 'kuppam.deekshith_btech24@gsv.ac.in', course: 'C programming', sem: 1, presentSem: 5, credit: 3 },
  { name: 'M Madhu Kushal', rollNo: '24AI036', email: 'madhu.kushal_btech24@gsv.ac.in', course: 'Engineering Mathematics I', sem: 1, presentSem: 5, credit: 4 },
  { name: 'M Madhu Kushal', rollNo: '24AI036', email: 'madhu.kushal_btech24@gsv.ac.in', course: 'DSA', sem: 3, presentSem: 5, credit: 3 },
  { name: 'M Madhu Kushal', rollNo: '24AI036', email: 'madhu.kushal_btech24@gsv.ac.in', course: 'OOP in Java', sem: 3, presentSem: 5, credit: 3 },
  { name: 'Madhav Swami', rollNo: '24AI037', email: 'madhav.swami_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Mandeep Nehra', rollNo: '24AI038', email: 'mandeep.nehra_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Mayuresh Tiwari', rollNo: '24AI039', email: 'mayuresh.tiwari_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Mohit Motsara', rollNo: '24AI040', email: 'mohit.motsara_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Mrunal Vijay Karwa', rollNo: '24AI041', email: 'mrunal.karwa_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Nitin Bagaria', rollNo: '24AI042', email: 'nitin.bagaria_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Patnam Sujitha', rollNo: '24AI043', email: 'patnam.sujitha_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Piyush Yadav', rollNo: '24AI044', email: 'piyush.yadav_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Pratima Chauhan', rollNo: '24AI045', email: 'pratima.chauhan_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Priyanshu Pratik', rollNo: '24AI046', email: 'priyanshu.pratik_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Rahul', rollNo: '24AI047', email: 'rahul.sen_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Rishi Singh', rollNo: '24AI048', email: 'rishi.singh_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'S K Priyanshu', rollNo: '24AI049', email: 'sk.priyanshu_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Salot Sakshi Nimesh', rollNo: '24AI050', email: 'salot.sakshi_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Sarvesh Chille', rollNo: '24AI051', email: 'sarvesh.chille_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Saurabh Kumar Bosak', rollNo: '24AI052', email: 'saurabh.bosak_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Shruti Prasad', rollNo: '24AI053', email: 'shruti.prasad_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Tushar Sabharwal', rollNo: '24AI054', email: 'tushar.sabharwal_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Vedant Pathak', rollNo: '24AI055', email: 'vedant.pathak_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Vibhu Narayan Kaushik', rollNo: '24AI056', email: 'vibhu.kaushik_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Vikas Khairiya', rollNo: '24AI057', email: 'vikas.khairiya_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Vinamra Tiwari', rollNo: '24AI058', email: 'vinamra.tiwari_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Dhanalakshmi. T', rollNo: '24AI101', email: 'dhanalakshmi.t_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'Sachin Bansal', rollNo: '24AI102', email: 'sachin.bansal_btech24@gsv.ac.in', course: 'None', sem: 0, presentSem: 5, credit: 0 },
  { name: 'ABHINAV KESARWANI', rollNo: '23AI002', email: 'abhinav.kesarwani_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ABHISHEK KUMAR', rollNo: '23AI003', email: 'abhishek.kumar_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ABHISHEK SINGH', rollNo: '23AI004', email: 'abhishek.s_btech23@gsv.ac.in', course: 'PRML', sem: 4, presentSem: 7, credit: 3 },
  { name: 'ABHISHEK SINGH', rollNo: '23AI004', email: 'abhishek.s_btech23@gsv.ac.in', course: 'Signals and System', sem: 4, presentSem: 7, credit: 3 },
  { name: 'ABHISHEK SINGH', rollNo: '23AI004', email: 'abhishek.s_btech23@gsv.ac.in', course: 'DSA Lab', sem: 3, presentSem: 7, credit: 1 },
  { name: 'ADITYA ACHARYA', rollNo: '23AI005', email: 'aditya.acharya_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'AJITESH CHANNA', rollNo: '23AI006', email: 'ajitesh.channa_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ANANT JAIN', rollNo: '23AI007', email: 'anant.jain_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ANANYA JAIN', rollNo: '23AI008', email: 'ananya.jain_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ANJALI CHAURASIYA', rollNo: '23AI009', email: 'anjali.chaurasiya_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ANKIT GUPTA', rollNo: '23AI010', email: 'ankit.gupta_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ANMOL VERMA', rollNo: '23AI011', email: 'anmol.verma_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ANSH SHARMA', rollNo: '23AI012', email: 'ansh.sharma_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ANURAG JAISWAL', rollNo: '23AI013', email: 'anurag.jaiswal_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ANURAG TIWARI', rollNo: '23AI014', email: 'anurag.tiwari_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ARUP DAS', rollNo: '23AI015', email: 'arup.das_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ASHISH KUMAR', rollNo: '23AI016', email: 'ashish.kumar_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ASMIT SHARMA', rollNo: '23AI017', email: 'asmit.sharma_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'BANSODE VIKRANT VINOD', rollNo: '23AI018', email: 'bansode.vikrant_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'CHAKSHU VASHISTH', rollNo: '23AI019', email: 'chakshu.vashisth_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'CHAMAN KUMAR', rollNo: '23AI020', email: 'chaman.kumar_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'DEV YADAV', rollNo: '23AI021', email: 'dev.yadav_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'GAGAN JAIN', rollNo: '23AI022', email: 'gagan.jain_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'HARPHOOL SINGH BAJDOLIYA', rollNo: '23AI023', email: 'harphool.bajdoliya_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'HARSH RAJ', rollNo: '23AI024', email: 'harsh.raj_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'HARSH VARDHAN', rollNo: '23AI025', email: 'harsh.vardhan_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'HIMANSHU', rollNo: '23AI026', email: 'himanshu_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ISHAN', rollNo: '23AI027', email: 'ishan_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'KABEER KUMAR', rollNo: '23AI029', email: 'kabeer.kumar_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'KANISHK KUSHWAHA', rollNo: '23AI030', email: 'kanishk.kushwaha_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'KARMVEER KUMAR', rollNo: '23AI031', email: 'karmveer.kumar_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'KUMAR ANIKET', rollNo: '23AI032', email: 'kumar.aniket_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'NIKET KUMAR', rollNo: '23AI033', email: 'niket.kumar_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'NIMMAKAYALA SHANMUKHA KUMAR', rollNo: '23AI034', email: 'nimmakayala.shanmukha_btech23@gsv.ac.in', course: 'Deep Learning', sem: 5, presentSem: 7, credit: 3 },
  { name: 'NIMMAKAYALA SHANMUKHA KUMAR', rollNo: '23AI034', email: 'nimmakayala.shanmukha_btech23@gsv.ac.in', course: 'Deep Learning Lab', sem: 5, presentSem: 7, credit: 1 },
  { name: 'OJASVA JADON', rollNo: '23AI035', email: 'ojasva.jadon_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'OMANA ARYA', rollNo: '23AI036', email: 'omana.arya_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'PIYUSH SHARMA', rollNo: '23AI037', email: 'piyush.sharma_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'PRADEEP KUMAR', rollNo: '23AI038', email: 'pradeep.kumar_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'PRATYUSH RAI', rollNo: '23AI039', email: 'pratyush.rai_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'RADHESHAM RAMESHRAO TAYNATH', rollNo: '23AI040', email: 'radhesham.taynath_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'RAHUL PANWAR', rollNo: '23AI041', email: 'rahul.panwar_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'RAVI PANCHAL', rollNo: '23AI042', email: 'ravi.panchal_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'RISHAV KUMAR', rollNo: '23AI043', email: 'rishav.kumar_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'RISHAV PAL', rollNo: '23AI044', email: 'rishav.pal_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'SAMBHAV VERMA', rollNo: '23AI045', email: 'sambhav.verma_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'SANAPALA HEMA RAJ VARABHUSHAN', rollNo: '23AI046', email: 'sanapala.hema_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'SAYANTAN MANDAL', rollNo: '23AI048', email: 'sayantan.mandal_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'SHIVAM GANGWAR', rollNo: '23AI049', email: 'shivam.gangwar_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'SHIVAM KUMAR', rollNo: '23AI050', email: 'shivam.kumar_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'SHIVANSH GUPTA', rollNo: '23AI051', email: 'shivansh.gupta_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'SIDDHANT ROY', rollNo: '23AI052', email: 'siddhant.roy_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'SUMIT', rollNo: '23AI053', email: 'sumit_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'VIKASH KUMAR', rollNo: '23AI054', email: 'vikash.kumar_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'VISHVENDRA', rollNo: '23AI055', email: 'vishvendra_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'VIVEK RAJAK', rollNo: '23AI056', email: 'vivek.rajak_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'YEETRADITY DHADHIYA', rollNo: '23AI057', email: 'yeetradity.dhadhiya_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'ARYAN THAKUR', rollNo: '23AI101', email: 'aryan.thakur_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'RAJYAVARDHANSINGH SHEKHAWAT', rollNo: '23AI102', email: 'rajyavardhansingh.shekhawat_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
  { name: 'SHRUTI VERMA', rollNo: '23AI103', email: 'shruti.verma_btech23@gsv.ac.in', course: 'None', sem: 0, presentSem: 7, credit: 0 },
];

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) { saveData(SEED_DATA); return [...SEED_DATA]; }
  try { return JSON.parse(raw); }
  catch { saveData(SEED_DATA); return [...SEED_DATA]; }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let records = loadData();

// ─── DOM Helpers ─────────────────────────────────────────────────────────────

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function escapeHTML(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  $('#toast-container').appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

function renderMsg(text, type = 'success') {
  return `<div class="msg msg-${type}">${text}</div>`;
}

function renderEmpty(text) {
  return `
    <div class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      <p>${text}</p>
    </div>`;
}

function creditDisplay(credit) {
  if (credit === 0) return '<span class="sem-badge badge-success">No Backlog</span>';
  return credit;
}

function semDisplay(sem) {
  if (sem === 0) return '—';
  return `<span class="sem-badge">Sem ${sem}</span>`;
}

// ─── Stats ───────────────────────────────────────────────────────────────────

function updateStats() {
  $('#stat-total').textContent    = records.length;
  $('#stat-students').textContent = new Set(records.map(r => r.rollNo.toLowerCase())).size;
  $('#stat-courses').textContent  = new Set(records.filter(r => r.credit > 0).map(r => r.course.toLowerCase())).size;
}

// ─── Sidebar Navigation ─────────────────────────────────────────────────────

const sidebarBtns = $$('.sidebar-btn');
const panels      = $$('.tab-panel');

function switchTab(tabId) {
  sidebarBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  panels.forEach(p => p.classList.toggle('active', p.id === `panel-${tabId}`));
}

sidebarBtns.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Clickable "Total Records" stat
$('#stat-total-btn').addEventListener('click', () => {
  switchTab('all-records');
  showAllRecords();
});

// ─── Search by Name ──────────────────────────────────────────────────────────

function searchByName() {
  const q = $('#input-student-name').value.trim();
  if (!q) { $('#result-name').innerHTML = renderMsg('Please enter a student name.', 'error'); return; }

  const matches = records.filter(r => r.name.toLowerCase().includes(q.toLowerCase()));
  if (!matches.length) { $('#result-name').innerHTML = renderEmpty(`No records found for "${escapeHTML(q)}".`); return; }

  $('#result-name').innerHTML = renderStudentCards(matches);
}

$('#btn-search-name').addEventListener('click', searchByName);
$('#input-student-name').addEventListener('keydown', e => { if (e.key === 'Enter') searchByName(); });

// ─── Search by Roll No ──────────────────────────────────────────────────────

function searchByRoll() {
  const q = $('#input-roll-no').value.trim();
  if (!q) { $('#result-roll').innerHTML = renderMsg('Please enter a roll number.', 'error'); return; }

  const matches = records.filter(r => r.rollNo.toLowerCase().includes(q.toLowerCase()));
  if (!matches.length) { $('#result-roll').innerHTML = renderEmpty(`No records found for roll number "${escapeHTML(q)}".`); return; }

  $('#result-roll').innerHTML = renderStudentCards(matches);
}

$('#btn-search-roll').addEventListener('click', searchByRoll);
$('#input-roll-no').addEventListener('keydown', e => { if (e.key === 'Enter') searchByRoll(); });

// ─── Render student grouped cards (shared by name & roll search) ─────────

function renderStudentCards(matches) {
  // Sort by presentSem ascending
  matches.sort((a, b) => (a.presentSem || 0) - (b.presentSem || 0));

  const grouped = {};
  const groupOrder = [];
  matches.forEach(r => {
    const key = r.rollNo.toLowerCase();
    if (!grouped[key]) { grouped[key] = []; groupOrder.push(key); }
    grouped[key].push(r);
  });

  let html = '';
  for (const key of groupOrder) {
    const recs = grouped[key];
    const f = recs[0];
    const hasBacklog = recs.some(r => r.credit > 0);

    html += `
      <div class="result-card">
        <h3>${escapeHTML(f.name)}</h3>
        <p class="subtitle">Roll No: ${escapeHTML(f.rollNo)} &nbsp;•&nbsp; ${escapeHTML(f.email)} &nbsp;•&nbsp; Present Sem: ${f.presentSem || '—'}</p>
        ${!hasBacklog
          ? '<div class="msg msg-success" style="margin-top:0">✓ This student has no backlogs.</div>'
          : `<div class="data-table-wrapper">
              <table class="data-table">
                <thead><tr><th>Sr.</th><th>Course Title</th><th>Backlog In Sem</th><th>Present Sem</th><th>Credit</th></tr></thead>
                <tbody>
                  ${recs.filter(r => r.credit > 0).map((r, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${escapeHTML(r.course)}</td>
                      <td>${semDisplay(r.sem)}</td>
                      <td>${r.presentSem || '—'}</td>
                      <td>${r.credit}</td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>`
        }
      </div>`;
  }
  return html;
}

// ─── Search by Course ────────────────────────────────────────────────────────

function searchCourse() {
  const q = $('#input-course-name').value.trim();
  if (!q) { $('#result-course').innerHTML = renderMsg('Please enter a course name.', 'error'); return; }

  const matches = records.filter(r => r.credit > 0 && r.course.toLowerCase().includes(q.toLowerCase()));
  if (!matches.length) { $('#result-course').innerHTML = renderEmpty(`No backlog records found for course "${escapeHTML(q)}".`); return; }

  // Sort by presentSem ascending
  matches.sort((a, b) => (a.presentSem || 0) - (b.presentSem || 0));
  const unique = new Set(matches.map(m => m.rollNo.toLowerCase()));

  $('#result-course').innerHTML = `
    <div class="result-card">
      <h3>Course: ${escapeHTML(matches[0].course)}</h3>
      <div class="course-summary">
        <div class="summary-chip"><span class="chip-label">Total Students</span><span class="chip-value">${unique.size}</span></div>
        <div class="summary-chip"><span class="chip-label">Total Records</span><span class="chip-value">${matches.length}</span></div>
      </div>
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead><tr><th>Sr.</th><th>Student Name</th><th>Roll No.</th><th>Email</th><th>Backlog In Sem</th><th>Present Sem</th><th>Credit</th></tr></thead>
          <tbody>
            ${matches.map((r, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${escapeHTML(r.name)}</td>
                <td>${escapeHTML(r.rollNo)}</td>
                <td>${escapeHTML(r.email)}</td>
                <td>${semDisplay(r.sem)}</td>
                <td>${r.presentSem || '—'}</td>
                <td>${r.credit}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

$('#btn-search-course').addEventListener('click', searchCourse);
$('#input-course-name').addEventListener('keydown', e => { if (e.key === 'Enter') searchCourse(); });

// ─── Add Student ─────────────────────────────────────────────────────────────

$('#form-add-student').addEventListener('submit', e => {
  e.preventDefault();

  const name       = $('#add-name').value.trim();
  const rollNo     = $('#add-roll').value.trim();
  const email      = $('#add-email').value.trim();
  const course     = $('#add-course').value.trim();
  const sem        = parseInt($('#add-sem').value, 10);
  const presentSem = parseInt($('#add-present-sem').value, 10);
  const credit     = parseInt($('#add-credit').value, 10);

  if (!name || !rollNo || !email || !course || isNaN(sem) || isNaN(presentSem) || isNaN(credit)) {
    $('#result-add').innerHTML = renderMsg('All fields are required.', 'error');
    return;
  }

  const dup = records.find(r =>
    r.rollNo.toLowerCase() === rollNo.toLowerCase() &&
    r.course.toLowerCase() === course.toLowerCase() &&
    r.sem === sem
  );

  if (dup) {
    $('#result-add').innerHTML = renderMsg(`Duplicate: "${name}" already has "${course}" as a backlog in Sem ${sem}.`, 'warning');
    return;
  }

  records.push({ name, rollNo, email, course, sem, presentSem, credit });
  saveData(records);
  updateStats();
  $('#form-add-student').reset();

  const label = credit === 0 ? `${name} — No Backlog` : `${name} / ${course} (Sem ${sem})`;
  $('#result-add').innerHTML = renderMsg(`✓ Record added — ${label}`, 'success');
  showToast(`Record added for ${name}`);
});

// ─── Drop Student ────────────────────────────────────────────────────────────

function dropStudent() {
  const q = $('#input-drop-name').value.trim();
  if (!q) { $('#result-drop').innerHTML = renderMsg('Please enter a student name.', 'error'); return; }

  const matches = records.filter(r => r.name.toLowerCase() === q.toLowerCase());
  if (!matches.length) { $('#result-drop').innerHTML = renderEmpty(`No records found for "${escapeHTML(q)}".`); return; }

  showConfirm(
    'Confirm Deletion',
    `Are you sure you want to delete <strong>${matches.length} record(s)</strong> for <strong>${escapeHTML(matches[0].name)}</strong>? This cannot be undone.`,
    () => {
      records = records.filter(r => r.name.toLowerCase() !== q.toLowerCase());
      saveData(records);
      updateStats();
      $('#input-drop-name').value = '';
      $('#result-drop').innerHTML = renderMsg(`✓ Removed ${matches.length} record(s) for "${matches[0].name}".`, 'success');
      showToast(`Dropped ${matches.length} record(s) for ${matches[0].name}`);
    }
  );
}

$('#btn-drop-student').addEventListener('click', dropStudent);
$('#input-drop-name').addEventListener('keydown', e => { if (e.key === 'Enter') dropStudent(); });

// ─── All Records ─────────────────────────────────────────────────────────────

function showAllRecords() {
  if (!records.length) {
    $('#result-all').innerHTML = renderEmpty('No records in the database.');
    return;
  }

  // Sort by presentSem ascending
  const sorted = [...records].sort((a, b) => (a.presentSem || 0) - (b.presentSem || 0));

  $('#result-all').innerHTML = `
    <div class="result-card">
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead><tr><th>Sr.</th><th>Name</th><th>Roll No.</th><th>Email</th><th>Course Title</th><th>Backlog In Sem</th><th>Present Sem</th><th>Credit</th></tr></thead>
          <tbody>
            ${sorted.map((r, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${escapeHTML(r.name)}</td>
                <td>${escapeHTML(r.rollNo)}</td>
                <td>${escapeHTML(r.email)}</td>
                <td>${r.credit === 0 ? '—' : escapeHTML(r.course)}</td>
                <td>${r.credit === 0 ? '—' : semDisplay(r.sem)}</td>
                <td>${r.presentSem || '—'}</td>
                <td>${creditDisplay(r.credit)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

// Load all records when the tab is clicked
$('#tab-all-records').addEventListener('click', showAllRecords);

// ─── Confirm Dialog ──────────────────────────────────────────────────────────

function showConfirm(title, message, onConfirm) {
  const o = document.createElement('div');
  o.className = 'confirm-overlay';
  o.innerHTML = `
    <div class="confirm-box">
      <h3>${title}</h3>
      <p>${message}</p>
      <div class="confirm-actions">
        <button class="btn-cancel" id="confirm-cancel">Cancel</button>
        <button class="btn-danger" id="confirm-ok">Delete</button>
      </div>
    </div>`;
  document.body.appendChild(o);
  o.querySelector('#confirm-cancel').addEventListener('click', () => o.remove());
  o.querySelector('#confirm-ok').addEventListener('click', () => { o.remove(); onConfirm(); });
  o.addEventListener('click', e => { if (e.target === o) o.remove(); });
}

// ─── Init ────────────────────────────────────────────────────────────────────

updateStats();
