package com.qsp.Hospital_Management.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.qsp.Hospital_Management.model.Patient;
import com.qsp.Hospital_Management.repo.PatientRepository;

@Repository
public class PatientDao {

	@Autowired
	private PatientRepository patientRepository;
	
	public Patient savePatient(Patient patient) {
		return patientRepository.save(patient);
	}
	
	public List<Patient> fetchAllPatients(){
		return patientRepository.findAll();
	}
	
	public Patient fetchPatientById(Long patientId) {
		return patientRepository.findById(patientId).orElse(null);
	}
	
	public Patient updatePatientById(Long oldPatientId, Patient newPatient ) {
		newPatient.setPatientId(oldPatientId);
		return patientRepository.save(newPatient);
	}
	
	public boolean deletePatientById(Long patientId) {
		if(patientRepository.existsById(patientId)) {
			patientRepository.deleteById(patientId);
			return true;		
		}else {
			return false;
		}
//		Patient patient=fetchPatientById(patientId);
//		patientRepository.delete(patient);
//		return patient;
	}
	public List<Patient> searchPatientsByName(String patientName) {
	    return patientRepository.findByPatientNameContainingIgnoreCase(patientName);
	}
	
	public List<Patient> filterPatientsByGender(String patientGender) {
	    return patientRepository.findByPatientGenderIgnoreCase(patientGender);
	}
	
	
	
	
}
