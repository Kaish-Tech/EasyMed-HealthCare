package com.qsp.Hospital_Management.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.qsp.Hospital_Management.model.Doctor;
import com.qsp.Hospital_Management.repo.DoctorRepository;

@Repository
public class DoctorDao {

	@Autowired
	private DoctorRepository doctorRepository;
	
	public Doctor saveDoctor(Doctor doctor) {
		return doctorRepository.save(doctor);	
	}
	
	public List<Doctor> fetchAllDoctors(){
		return doctorRepository.findAll();
	}
	
	public Doctor fetchDoctorById(Long doctorId) {
		return doctorRepository.findById(doctorId).orElse(null);
	}
	public Doctor updateDoctorById(Long oldDoctorId,Doctor newDoctor) {
		newDoctor.setDoctorId(oldDoctorId);
		return doctorRepository.save(newDoctor);
	}
	public boolean deleteDoctorById(Long doctorId) {
		if(doctorRepository.existsById(doctorId)) {
			doctorRepository.deleteById(doctorId);
			return true;		
		}else {
			return false;
		}
	}
	
	public List<Doctor> filterDoctorsBySpecialization(String doctorSpecialization) {
	    return doctorRepository.findByDoctorSpecialization(doctorSpecialization);
	}

	
}
