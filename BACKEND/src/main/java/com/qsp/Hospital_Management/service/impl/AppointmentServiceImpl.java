package com.qsp.Hospital_Management.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qsp.Hospital_Management.dao.AppointmentDao;
import com.qsp.Hospital_Management.dao.DoctorDao;
import com.qsp.Hospital_Management.dao.PatientDao;
import com.qsp.Hospital_Management.model.Appointment;
import com.qsp.Hospital_Management.model.Doctor;
import com.qsp.Hospital_Management.model.Patient;
import com.qsp.Hospital_Management.service.AppointmentService;

@Service
public class AppointmentServiceImpl implements AppointmentService{

	@Autowired
	private AppointmentDao appointmentDao;
	
	@Autowired
	private DoctorDao doctorDao;
	
	@Autowired
	private PatientDao patientDao;
	
	@Override
	public Appointment saveAppointment(Appointment appointment) {
		Patient patient = patientDao.fetchPatientById(appointment.getPatient().getPatientId());
		Doctor doctor = doctorDao.fetchDoctorById(appointment.getDoctor().getDoctorId());
		if (patient!=null && doctor!=null) {
	        appointment.setPatient(patient);
	        appointment.setDoctor(doctor);
	        return appointmentDao.saveAppointment(appointment);
	    } else {
	        throw new RuntimeException("Invalid patient or doctor ID");
	    }
		
	}

	@Override
	public List<Appointment> fetchAllAppointments() {
		return appointmentDao.fetchAllAppointments();
	}

	@Override
	public Appointment fetchAppointmentById(Long appointmentId) {
		Appointment appointment= appointmentDao.fetchAppointmentById(appointmentId);
		return appointment;
	}

	@Override
	public boolean deleteAppointmentById(Long appointmentId) {
		return appointmentDao.deleteAppointmentById(appointmentId);
	}

	@Override
	public Appointment updateAppointmentById(Long oldappointmentId, Appointment newAppointment) {
		return appointmentDao.updateAppointmentById(oldappointmentId, newAppointment);
	}
	
	@Override
	public List<Appointment> fetchAppointmentsByDate(LocalDate appointmentDate) {
        return appointmentDao.fetchAppointmentsByDate(appointmentDate);
    }

}
