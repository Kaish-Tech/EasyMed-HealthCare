package com.qsp.Hospital_Management.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qsp.Hospital_Management.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long>{

	List<Patient> findByPatientNameContainingIgnoreCase(String name);
	 List<Patient> findByPatientGenderIgnoreCase(String gender);
	    List<Patient> findByPatientAgeGreaterThanEqual(int age);
	    Patient findByPatientEmail(String email);
	    Patient findByPatientPhone(Long phone);
	
}
