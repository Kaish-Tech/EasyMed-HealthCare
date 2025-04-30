package com.qsp.Hospital_Management.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qsp.Hospital_Management.dao.DoctorDao;
import com.qsp.Hospital_Management.model.Doctor;
import com.qsp.Hospital_Management.service.DoctorService;

@Service
public class DoctorServiceImpl implements DoctorService {

	@Autowired
	private DoctorDao doctorDao;
	
	@Override
	public Doctor saveDoctor(Doctor doctor) {
		return doctorDao.saveDoctor(doctor);
	}

	@Override
	public List<Doctor> fetchAllDoctors() {
		return doctorDao.fetchAllDoctors();
	}

	@Override
	public Doctor fetchDoctorById(Long doctorId) {
		return doctorDao.fetchDoctorById(doctorId);
	}

	@Override
	public Doctor updateDoctorById(Long oldDoctorId, Doctor newDoctor) {
		return doctorDao.updateDoctorById(oldDoctorId, newDoctor);
	}

	@Override
	public boolean deleteDoctorById(Long doctorId) {
		return doctorDao.deleteDoctorById(doctorId);
	}
	
	@Override
	public List<Doctor> filterDoctorsBySpecialization(String doctorSpecialization) {
	    return doctorDao.filterDoctorsBySpecialization(doctorSpecialization);
	}



}
