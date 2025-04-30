
package com.qsp.Hospital_Management.service;

import java.util.List;


import com.qsp.Hospital_Management.model.Doctor;

public interface DoctorService {

	Doctor saveDoctor(Doctor doctor);
	List<Doctor> fetchAllDoctors();
	Doctor fetchDoctorById(Long doctorId);
	Doctor updateDoctorById(Long oldDoctorId,Doctor newDoctor);
	boolean deleteDoctorById(Long doctorId);
	List<Doctor> filterDoctorsBySpecialization(String doctorSpecialization);

}
